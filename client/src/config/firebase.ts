// Firebase Configuration
// This will be populated with actual Firebase credentials from environment variables

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ya-lesedi-training.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ya-lesedi-training",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ya-lesedi-training.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Cloud Collections Schema
export const COLLECTIONS = {
  USERS: 'users',
  RESTAURANTS: 'restaurants',
  TRAINING_MANUALS: 'training_manuals',
  QUIZZES: 'quizzes',
  QUIZ_RESULTS: 'quiz_results',
  ANALYTICS: 'analytics',
  NOTIFICATIONS: 'notifications',
  STAFF: 'staff'
};

// User Roles
export const USER_ROLES = {
  MASTER_ADMIN: 'master_admin',
  STORE_MANAGER: 'store_manager',
  STAFF: 'staff'
};

