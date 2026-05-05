import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, Patient, UserRole } from '../types';
import { extractNameFromEmail } from '../utils/avatarUtils';

const STORAGE_KEY = 'meditrack_profile';

interface AuthState {
  user: Patient | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Patient>) => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/men/86.jpg';

const MOCK_PATIENT: Patient = {
  id: 'patient1',
  email: 'john@example.com',
  phone: '+1234567890',
  role: 'patient',
  firstName: 'John',
  lastName: 'Doe',
  isVerified: true,
  createdAt: '2024-06-15',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  emergencyContact: { name: 'Jane Doe', phone: '+1234567899', relationship: 'Spouse' },
  healthScore: 82,
  avatar: DEFAULT_AVATAR,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null,
  });

  // Load persisted profile overrides on auth
  useEffect(() => {
    if (!state.isAuthenticated || !state.user) return;
    const loadProfile = async () => {
      try {
        const stored = await SecureStore.getItemAsync(STORAGE_KEY);
        if (stored) {
          const overrides = JSON.parse(stored) as Partial<Patient>;
          setState(prev => ({
            ...prev,
            user: prev.user ? { ...prev.user, ...overrides } : null,
          }));
        }
      } catch {}
    };
    loadProfile();
  }, [state.isAuthenticated]);

  const login = useCallback(async (email: string, _password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { firstName, lastName } = extractNameFromEmail(email);
    setState({
      user: {
        ...MOCK_PATIENT,
        email,
        firstName,
        lastName,
        avatar: DEFAULT_AVATAR,
      },
      isAuthenticated: true,
      isLoading: false,
      token: 'mock-jwt-token-xyz',
    });
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1500));
    setState({
      user: {
        ...MOCK_PATIENT,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        avatar: DEFAULT_AVATAR,
      },
      isAuthenticated: true,
      isLoading: false,
      token: 'mock-jwt-token-new',
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEY);
    } catch {}
    setState({ user: null, isAuthenticated: false, isLoading: false, token: null });
  }, []);

  const updateProfile = useCallback(async (data: Partial<Patient>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...data } : null,
    }));
    try {
      const existing = await SecureStore.getItemAsync(STORAGE_KEY);
      const current = existing ? JSON.parse(existing) : {};
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify({ ...current, ...data }));
    } catch {}
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
