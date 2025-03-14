import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase, getCurrentUser, signOut } from './supabase';
import type { User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to refresh the user data
  const refreshUser = async () => {
    try {
      const { user: currentUser, error } = await getCurrentUser();
      if (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } else {
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error in refreshUser:', error);
      setUser(null);
    }
  };

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        setUser(null);
        router.push('/login');
      }
    } catch (error) {
      console.error('Error in handleSignOut:', error);
    }
  };

  useEffect(() => {
    // Check for user on initial load
    const initAuth = async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
    };

    initAuth();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      // Clean up the subscription when the component unmounts
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const value = {
    user,
    loading,
    signOut: handleSignOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 