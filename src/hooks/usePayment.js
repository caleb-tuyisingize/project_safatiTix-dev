import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payment, setPayment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const pollingRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (pollingRef.current) clearTimeout(pollingRef.current);
    };
  }, []);

  const formatPhone = useCallback((phoneNumber) => {
    const digits = String(phoneNumber).replace(/\D/g, '');
    if (digits.startsWith('250')) return `+${digits}`;
    if (digits.startsWith('0')) return `+250${digits.slice(1)}`;
    if (digits.length === 9) return `+250${digits}`;
    return `+${digits}`;
  }, []);

  const initiatePayment = useCallback(async (ticketId, phoneNumber, amount) => {
    setLoading(true);
    setError('');
    setPayment(null);

    try {
      if (!ticketId || !phoneNumber || !amount) {
        throw new Error('Missing required fields');
      }

      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      const formattedPhone = formatPhone(phoneNumber);

      const response = await axios.post(
        '/api/payments/initiate',
        {
          ticketId,
          phoneNumber: formattedPhone,
          amount: parseFloat(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setPayment(response.data.payment);
      setPaymentStatus('Waiting for payment confirmation...');
      setLoading(false);

      return response.data.payment;

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Payment initiation failed';
      setError(errorMsg);
      setLoading(false);
      throw err;
    }
  }, [formatPhone]);

  const checkPaymentStatus = useCallback(async (paymentId, onSuccess, onFailed, maxWaitMs = 5 * 60 * 1000) => {
    const startTime = Date.now();

    const poll = async () => {
      if (!isMountedRef.current) return;

      if (Date.now() - startTime > maxWaitMs) {
        setError('Payment confirmation timed out');
        setPaymentStatus('');
        return;
      }

      try {
        const response = await axios.get(
          `/api/payments/${paymentId}/status`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        const paymentData = response.data.payment;

        if (paymentData.status === 'paid' || paymentData.status === 'success') {
          setPaymentStatus('Payment successful!');
          setPayment(paymentData);
          if (onSuccess) onSuccess(paymentData);
          return;
        }

        if (paymentData.status === 'failed' || paymentData.status === 'cancelled') {
          setError('Payment was declined or cancelled');
          setPaymentStatus('');
          if (onFailed) onFailed(paymentData);
          return;
        }

        setPaymentStatus('Waiting for payment confirmation...');
        pollingRef.current = setTimeout(poll, 4000);

      } catch (err) {
        console.error('Payment status check error:', err);
        pollingRef.current = setTimeout(poll, 4000);
      }
    };

    poll();
  }, []);

  const cancelPayment = useCallback(async (paymentId) => {
    try {
      const response = await axios.post(
        `/api/payments/${paymentId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setPayment(null);
      setPaymentStatus('');
      return response.data;

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Cancellation failed';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const clearPayment = useCallback(() => {
    setPayment(null);
    setError('');
    setPaymentStatus('');
    setLoading(false);
    if (pollingRef.current) clearTimeout(pollingRef.current);
  }, []);

  return {
    loading,
    error,
    payment,
    paymentStatus,
    initiatePayment,
    checkPaymentStatus,
    cancelPayment,
    clearPayment
  };
};

export default usePayment;
