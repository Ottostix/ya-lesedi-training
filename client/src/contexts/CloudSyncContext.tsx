import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { firebaseService, User, Restaurant, Analytics, Notification } from '../services/firebaseService';

interface CloudSyncContextType {
  // Connection status
  isConnected: boolean;
  isSyncing: boolean;
  
  // User data
  currentUser: User | null;
  users: User[];
  
  // Restaurant data
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  
  // Analytics data
  analytics: Analytics | null;
  
  // Notifications
  notifications: Notification[];
  unreadNotificationCount: number;
  
  // Methods
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  markNotificationAsRead: (notificationId: string) => void;
  refreshData: () => Promise<void>;
}

const CloudSyncContext = createContext<CloudSyncContextType | undefined>(undefined);

export const CloudSyncProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize cloud sync on mount
  useEffect(() => {
    initializeCloudSync();
  }, []);

  // Set up real-time listeners
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribers: Array<() => void> = [];

    // Listen to users changes
    if (selectedRestaurant) {
      unsubscribers.push(
        firebaseService.onUsersChange(selectedRestaurant.id, (updatedUsers) => {
          setUsers(updatedUsers);
        })
      );

      // Listen to analytics changes
      unsubscribers.push(
        firebaseService.onAnalyticsChange(selectedRestaurant.id, (updatedAnalytics) => {
          setAnalytics(updatedAnalytics);
        })
      );
    }

    // Listen to restaurants changes
    unsubscribers.push(
      firebaseService.onRestaurantsChange((updatedRestaurants) => {
        setRestaurants(updatedRestaurants);
      })
    );

    // Cleanup listeners on unmount
    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [currentUser, selectedRestaurant]);

  const initializeCloudSync = async () => {
    try {
      setIsSyncing(true);
      
      // Test Firebase connection
      const connected = await firebaseService.testConnection();
      setIsConnected(connected);

      // Load current user from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);

        // Load user's restaurants
        const userRestaurants = await firebaseService.listRestaurants();
        setRestaurants(userRestaurants);

        // Set first restaurant as selected if available
        if (userRestaurants.length > 0) {
          setSelectedRestaurant(userRestaurants[0]);
        }

        // Load user's notifications
        const userNotifications = await firebaseService.getUserNotifications(user.id);
        setNotifications(userNotifications);
      }
    } catch (error) {
      console.error('Cloud sync initialization error:', error);
      setIsConnected(false);
    } finally {
      setIsSyncing(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await firebaseService.markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const refreshData = async () => {
    try {
      setIsSyncing(true);

      if (currentUser && selectedRestaurant) {
        // Refresh users
        const updatedUsers = await firebaseService.listUsers(selectedRestaurant.id);
        setUsers(updatedUsers);

        // Refresh analytics
        const updatedAnalytics = await firebaseService.getAnalytics(selectedRestaurant.id);
        setAnalytics(updatedAnalytics || null);

        // Refresh notifications
        const updatedNotifications = await firebaseService.getUserNotifications(currentUser.id);
        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const value: CloudSyncContextType = {
    isConnected,
    isSyncing,
    currentUser,
    users,
    restaurants,
    selectedRestaurant,
    analytics,
    notifications,
    unreadNotificationCount,
    setSelectedRestaurant,
    markNotificationAsRead,
    refreshData,
  };

  return (
    <CloudSyncContext.Provider value={value}>
      {children}
    </CloudSyncContext.Provider>
  );
};

// Custom hook to use cloud sync context
export const useCloudSync = (): CloudSyncContextType => {
  const context = useContext(CloudSyncContext);
  if (context === undefined) {
    throw new Error('useCloudSync must be used within CloudSyncProvider');
  }
  return context;
};

