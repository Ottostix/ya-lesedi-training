// Firebase Configuration
// This file contains the Firebase configuration for cloud storage and authentication

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase configuration
// Note: In production, these should be environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemoKeyForDevelopment",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "ya-lesedi-training.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "ya-lesedi-training",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "ya-lesedi-training.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app)

export default app

