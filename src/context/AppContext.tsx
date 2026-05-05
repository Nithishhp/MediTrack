import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../constants/mockData';

interface AppContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, isDarkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
