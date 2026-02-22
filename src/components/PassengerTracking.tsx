import React, { useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from '@react-google-maps/api';
import { AlertCircle, Bus, Loader2, MapPin, RefreshCw } from 'lucide-react';
import { socketOptions, SOCKET_ORIGIN } from '../utils/network';

interface PassengerTrackingProps {
  scheduleId: string;
  ticketId: string;
  routeFrom?: string;
  routeTo?: string;
  departureTime?: string | Date;
  arrivalTime?: string | Date;
  autoStart?: boolean;
}

interface BusLocation {
  latitude: number;
  longitude: number;
  speed: number | null;
  heading: number | null;
  timestamp: string | number;
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
type TrackingMode = 'idle' | 'live' | 'estimated';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const hasGoogleMapsKey = typeof GOOGLE_MAPS_API_KEY === 'string' && GOOGLE_MAPS_API_KEY.trim().length > 0;
const DEFAULT_CENTER: google.maps.LatLngLiteral = { lat: -1.9441, lng: 30.0619 };
const DEFAULT_TRIP_DURATION_MINUTES = 90;
const KNOWN_LOCATIONS: Record<string, google.maps.LatLngLiteral> = {
  'kigali nyabugogo': { lat: -1.9423, lng: 30.0445 },
  nyabugogo: { lat: -1.9423, lng: 30.0445 },
  kigali: { lat: -1.9441, lng: 30.0619 },
  'mukoto rulindo': { lat: -1.7552, lng: 30.1162 },
  mukoto: { lat: -1.7552, lng: 30.1162 },
  rulindo: { lat: -1.7095, lng: 29.9949 },
};

const normalizeLocationName = (value?: string) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const parseDate = (value?: string | Date): Date | null => {
  if (!value) return null;
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const resolveAuthToken = () =>
  localStorage.getItem('accessToken') || localStorage.getItem('token') || '';

const estimatePosition = (
  from: google.maps.LatLngLiteral,
  to: google.maps.LatLngLiteral,
  departureTime?: string | Date,
  arrivalTime?: string | Date
): google.maps.LatLngLiteral => {
  const departure = parseDate(departureTime);
  const arrival = parseDate(arrivalTime);
  const now = Date.now();
  let progress = 0.2;

  if (departure && arrival && arrival.getTime() > departure.getTime()) {
    const total = arrival.getTime() - departure.getTime();
    const elapsed = now - departure.getTime();
    progress = Math.min(1, Math.max(0, elapsed / total));
  } else if (departure) {
    const total = DEFAULT_TRIP_DURATION_MINUTES * 60 * 1000;
    const elapsed = now - departure.getTime();
    progress = Math.min(1, Math.max(0, elapsed / total));
  }

  return {
    lat: from.lat + (to.lat - from.lat) * progress,
    lng: from.lng + (to.lng - from.lng) * progress,
  };
};

const PassengerTracking: React.FC<PassengerTrackingProps> = ({
  scheduleId,
  ticketId,
  routeFrom,
  routeTo,
  departureTime,
  arrivalTime,
  autoStart = true,
}) => {
  const [isTracking, setIsTracking] = useState(false);
  const [busLocation, setBusLocation] = useState<BusLocation | null>(null);
  const [estimatedLocation, setEstimatedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [trackingMode, setTrackingMode] = useState<TrackingMode>('idle');
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(DEFAULT_CENTER);
  const [routeEndpoints, setRouteEndpoints] = useState<{
    from: google.maps.LatLngLiteral;
    to: google.maps.LatLngLiteral;
  } | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const estimateIntervalRef = useRef<number | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'passenger-tracking-map',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || '',
  });

  const busIcon = useMemo(() => {
    return {
      url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="%230077B6"/><path d="M7 6h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v1.5a1 1 0 1 1-2 0V16h-4v1.5a1 1 0 1 1-2 0V16H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm1 2v3h8V8H8Zm1 5.25a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" fill="white"/></svg>',
    } as google.maps.Icon;
  }, [isTracking, busLocation, estimatedLocation]);

  const stopEstimateTimer = () => {
    if (estimateIntervalRef.current !== null) {
      window.clearInterval(estimateIntervalRef.current);
      estimateIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopEstimateTimer();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!autoStart || isTracking || !hasGoogleMapsKey) return;
    startTracking();
  }, [autoStart, isTracking]);

  useEffect(() => {
    if (!isTracking) {
      stopEstimateTimer();
      return;
    }

    const fromKey = normalizeLocationName(routeFrom);
    const toKey = normalizeLocationName(routeTo);
    const knownFrom = KNOWN_LOCATIONS[fromKey];
    const knownTo = KNOWN_LOCATIONS[toKey];
    if (knownFrom && knownTo) {
      setRouteEndpoints({ from: knownFrom, to: knownTo });
      return;
    }

    if (!isLoaded || !window.google?.maps || !routeFrom || !routeTo) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: routeFrom }, (fromRes, fromStatus) => {
      if (fromStatus !== 'OK' || !fromRes?.[0]?.geometry?.location) return;
      geocoder.geocode({ address: routeTo }, (toRes, toStatus) => {
        if (toStatus !== 'OK' || !toRes?.[0]?.geometry?.location) return;
        const fromLoc = fromRes[0].geometry.location;
        const toLoc = toRes[0].geometry.location;
        setRouteEndpoints({
          from: { lat: fromLoc.lat(), lng: fromLoc.lng() },
          to: { lat: toLoc.lat(), lng: toLoc.lng() },
        });
      });
    });
  }, [isTracking, routeFrom, routeTo, isLoaded]);

  useEffect(() => {
    if (!isTracking || busLocation || !routeEndpoints) return;

    const updateEstimate = () => {
      const estimated = estimatePosition(routeEndpoints.from, routeEndpoints.to, departureTime, arrivalTime);
      setTrackingMode('estimated');
      setEstimatedLocation(estimated);
      setMapCenter(estimated);
      setLastUpdateTime(new Date());
    };

    updateEstimate();
    stopEstimateTimer();
    estimateIntervalRef.current = window.setInterval(updateEstimate, 15000);

    return () => stopEstimateTimer();
  }, [isTracking, busLocation, routeEndpoints, departureTime, arrivalTime]);

  const startTracking = () => {
    try {
      setError(null);
      setIsTracking(true);
      setTrackingMode('idle');
      setEstimatedLocation(null);

      const accessToken = resolveAuthToken();
      if (!accessToken) {
        throw new Error('Authentication required');
      }

      const socket = io(SOCKET_ORIGIN, {
        ...socketOptions,
        auth: { token: accessToken },
      });

      setConnectionStatus('connecting');

      socket.on('connect', () => {
        setConnectionStatus('connected');
        socket.emit('passenger:joinSchedule', { scheduleId, ticketId });
      });

      socket.on('bus:currentLocation', (data: BusLocation) => {
        setBusLocation(data);
        setTrackingMode('live');
        setLastUpdateTime(new Date());
        setMapCenter({ lat: data.latitude, lng: data.longitude });
        stopEstimateTimer();
      });

      socket.on('bus:locationUpdate', (data: BusLocation) => {
        setBusLocation(data);
        setTrackingMode('live');
        setLastUpdateTime(new Date());
        setMapCenter({ lat: data.latitude, lng: data.longitude });
        stopEstimateTimer();
      });

      socket.on('disconnect', () => {
        setConnectionStatus('disconnected');
      });

      socket.on('error', (data: { message: string }) => {
        setError(data.message);
        setConnectionStatus('error');
      });

      socketRef.current = socket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setIsTracking(false);
    }
  };

  const stopTracking = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsTracking(false);
    setTrackingMode('idle');
    setConnectionStatus('disconnected');
    setBusLocation(null);
    setEstimatedLocation(null);
    stopEstimateTimer();
    setLastUpdateTime(null);
    setMapCenter(DEFAULT_CENTER);
  };

  const markerPosition: google.maps.LatLngLiteral | null = busLocation
    ? { lat: busLocation.latitude, lng: busLocation.longitude }
    : estimatedLocation;

  const routePath = routeEndpoints ? [routeEndpoints.from, routeEndpoints.to] : [];

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'connecting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  const formatTimeDifference = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Bus className="w-6 h-6" />
          Track Your Bus
        </h2>
      </div>

      {error && (
        <div className="m-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {!hasGoogleMapsKey && (
        <div className="m-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-700 text-sm">
            Missing Google Maps key. Add <code>VITE_GOOGLE_MAPS_API_KEY</code> in frontend <code>.env</code>.
          </p>
        </div>
      )}

      {isTracking && (
        <div className="m-4 mb-0">
          <div className={`px-4 py-2 rounded-lg border ${getConnectionStatusColor()} flex items-center justify-between`}>
            <span className="text-sm font-medium">Status: {connectionStatus}</span>
            {lastUpdateTime && <span className="text-xs">{formatTimeDifference(lastUpdateTime)}</span>}
          </div>
        </div>
      )}

      {isTracking && hasGoogleMapsKey ? (
        <div className="relative">
          {!isLoaded ? (
            <div className="h-[500px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={{ height: '500px', width: '100%' }}
              center={markerPosition || mapCenter}
              zoom={14}
              onLoad={(mapInstance) => {
                mapRef.current = mapInstance;
              }}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }}
            >
              {routePath.length === 2 && (
                <PolylineF
                  path={routePath}
                  options={{
                    strokeColor: '#2563EB',
                    strokeOpacity: 0.7,
                    strokeWeight: 4,
                  }}
                />
              )}
              {markerPosition && <MarkerF position={markerPosition} icon={busIcon} />}
            </GoogleMap>
          )}

          {markerPosition && (
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Current Bus Location</span>
                {trackingMode === 'estimated' && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    Estimated
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Coordinates:</span>
                  <p className="font-mono text-xs">
                    {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
                  </p>
                </div>
                {busLocation?.speed !== null && busLocation?.speed && busLocation.speed > 0 && (
                  <div>
                    <span className="text-gray-600">Speed:</span>
                    <p className="font-medium">{busLocation.speed.toFixed(1)} km/h</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Your Bus in Real-Time</h3>
            <p className="text-gray-600 mb-6">
              See your bus location while the driver is on the trip. If GPS is unavailable, an estimated position is shown.
            </p>
            <button
              onClick={startTracking}
              disabled={!hasGoogleMapsKey}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Bus className="w-5 h-5" />
              Start Tracking
            </button>
          </div>
        </div>
      )}

      {isTracking && (
        <div className="p-4 border-t flex gap-3">
          <button
            onClick={stopTracking}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Stop Tracking
          </button>
          <button
            onClick={() => {
              if (!markerPosition) return;
              setMapCenter(markerPosition);
              mapRef.current?.panTo(markerPosition);
            }}
            disabled={!markerPosition}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Re-center
          </button>
        </div>
      )}

      {!isTracking && (
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-sm text-gray-600 text-center">
            <strong>Note:</strong> Tracking is available for active trips linked to your confirmed ticket.
          </p>
        </div>
      )}
    </div>
  );
};

export default PassengerTracking;
