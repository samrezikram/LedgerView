import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthContextValue = {
  session: Session | null;
  isLoading: boolean;
  isAuthBusy: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthBusy, setIsAuthBusy] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      isAuthBusy,
      signIn: async (email, password) => {
        setIsAuthBusy(true);
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        setIsAuthBusy(false);
        return error ? { error: error.message } : {};
      },
      signUp: async (email, password) => {
        setIsAuthBusy(true);
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        setIsAuthBusy(false);
        return error ? { error: error.message } : {};
      },
      signOut: async () => {
        setIsAuthBusy(true);
        await supabase.auth.signOut();
        setIsAuthBusy(false);
      },
    }),
    [session, isLoading, isAuthBusy]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
