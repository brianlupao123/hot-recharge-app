import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';
import { AuthService } from '../services/auth';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, pin: string) => Promise<UserProfile>;
  register: (name: string, phone: string, email: string, pin: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initAuth = async () => {
    try {
      const session = await AuthService.getSession();
      if (session.user) {
        setUser(session.user);
        setToken(session.token);
      }
    } catch (err) {
      console.warn('[AuthContext] Init error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (identifier: string, pin: string): Promise<UserProfile> => {
    const loggedIn = await AuthService.login(identifier, pin);
    const session = await AuthService.getSession();
    setUser(loggedIn);
    setToken(session.token);
    return loggedIn;
  };

  const register = async (
    name: string,
    phone: string,
    email: string,
    pin: string
  ): Promise<UserProfile> => {
    const registered = await AuthService.register(name, phone, email, pin);
    const session = await AuthService.getSession();
    setUser(registered);
    setToken(session.token);
    return registered;
  };

  const logout = async (): Promise<void> => {
    await AuthService.logout();
    setUser(null);
    setToken(null);
  };

  const refreshUser = async (): Promise<void> => {
    const current = await AuthService.getUser();
    setUser(current);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
