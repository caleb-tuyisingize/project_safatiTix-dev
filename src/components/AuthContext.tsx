import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase-client';
import type { PlanPermissions, SubscriptionPlan } from '../utils/subscriptionPlans';

type User = { id?: string; name?: string; email?: string; phone?: string | null; companyId?: string; companyName?: string; role?: string; homePath?: string; avatar_url?: string | null; profile_image?: string | null; emailVerified?: boolean; companyVerified?: boolean; accountStatus?: string; subscriptionPlan?: SubscriptionPlan; planPermissions?: PlanPermissions; supabase_user_id?: supabase_user_id} | null;

const DEFAULT_SUPABASE_ROLE = 'commuter';

function mapSupabaseUser(sessionUser: SupabaseUser): Exclude<User, null> {
  const metadata = sessionUser.user_metadata || {};
  const role = metadata.role || sessionUser.app_metadata?.role || DEFAULT_SUPABASE_ROLE;
  const homePath = metadata.homePath || metadata.home_path || sessionUser.app_metadata?.homePath || sessionUser.app_metadata?.home_path;

  return {
    id: sessionUser.id,
    name: metadata.full_name || metadata.name || metadata.display_name || sessionUser.email || '',
    email: sessionUser.email || undefined,
    phone: metadata.phone || null,
    role,
    homePath,
    avatar_url: metadata.avatar_url || metadata.picture || null,
    profile_image: metadata.profile_image || metadata.picture || null,
    emailVerified: Boolean(sessionUser.email_confirmed_at),
  };
}

interface AuthContextValue {
  user: User;
  accessToken?: string;
  loading: boolean;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Initialize auth from localStorage and optionally verify token
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const token = localStorage.getItem('token');
      const stored = localStorage.getItem('user');

      if (token && stored) {
        try {
          // Attempt server verification if endpoint exists
          const res = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            const json = await res.json();
            if (mounted) {
              setUser(json.user || JSON.parse(stored));
              setAccessToken(token);
              setLoading(false);
            }
            return;
          }

          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (e) {
          // ignore and fall back to the stored user or Supabase session
        }

        if (mounted) {
          try {
            setUser(JSON.parse(stored));
            setAccessToken(token);
            setLoading(false);
            return;
          } catch (e) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      }

      try {
        const { data } = await supabase.auth.getSession();
        const session = data.session;

        if (session?.user && mounted) {
          setUser(mapSupabaseUser(session.user));
          setAccessToken(session.access_token);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Failed to restore Supabase session:', e);
      }

      if (mounted) {
        setUser(null);
        setAccessToken(undefined);
        setLoading(false);
      }
    };

    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const hasCustomAuth = Boolean(localStorage.getItem('token') && localStorage.getItem('user'));
      if (!mounted || hasCustomAuth) {
        return;
      }

      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
        setAccessToken(session.access_token);
        setLoading(false);
        return;
      }

      setUser(null);
      setAccessToken(undefined);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (token: string, u: User) => {
    // Persist and update state
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u || null));
    setAccessToken(token);
    setUser(u || null);
    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    void supabase.auth.signOut().catch(() => {});
    setAccessToken(undefined);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthProvider;
