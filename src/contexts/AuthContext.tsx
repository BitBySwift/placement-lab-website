'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthContextProvider');
  }
  return context;
}

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Load user from localStorage on mount
    try {
      const storedUser = localStorage.getItem('placement_lab_user');
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback((user: User) => {
    try {
      localStorage.setItem('placement_lab_user', JSON.stringify(user));
    } catch {
      // localStorage unavailable
    }
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('placement_lab_user');
    } catch {
      // localStorage unavailable
    }
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setAuthState((prev) => {
      if (!prev.user) return prev;
      const updated = { ...prev.user, ...updates };
      try {
        localStorage.setItem('placement_lab_user', JSON.stringify(updated));
      } catch {
        // localStorage unavailable
      }
      return { ...prev, user: updated };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
