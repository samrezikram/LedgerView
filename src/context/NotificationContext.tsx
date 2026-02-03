import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Notification = {
  id: string;
  message: string;
  type?: 'info' | 'error' | 'success';
};

type NotificationContextValue = {
  notify: (message: string, type?: Notification['type']) => void;
  notifications: Notification[];
  dismiss: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications(current => current.filter(item => item.id !== id));
  }, []);

  const notify = useCallback((message: string, type?: Notification['type']) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setNotifications(current => [...current, { id, message, type }]);
  }, []);

  const value = useMemo(
    () => ({ notify, notifications, dismiss }),
    [notify, notifications, dismiss],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}
