# Cloud Integration Guide - Ya Lesedi Restaurant Training System

## Overview

This document outlines the cloud integration architecture for the Ya Lesedi Restaurant Training System. The system is designed to work with Firebase (Firestore) as the primary cloud database and Firebase Storage for file management.

## Architecture

### Services

#### 1. Firebase Service (`firebaseService.ts`)
- **Purpose**: Core cloud data management
- **Responsibilities**:
  - User management (CRUD operations)
  - Restaurant management
  - Training manual management
  - Quiz management and results
  - Analytics tracking
  - Notification management
  - Real-time data listeners

#### 2. Cloud Storage Service (`cloudStorageService.ts`)
- **Purpose**: File upload and management
- **Responsibilities**:
  - File uploads with progress tracking
  - File downloads
  - File metadata management
  - File deletion and archiving
  - Storage quota management

#### 3. Cloud Sync Context (`CloudSyncContext.tsx`)
- **Purpose**: Real-time data synchronization across the application
- **Responsibilities**:
  - Maintains cloud connection state
  - Manages real-time listeners
  - Provides data to all components via React Context
  - Handles data refresh and sync operations

## Data Models

### Collections Structure

```
/users/{userId}
  - User profiles
  - Authentication data
  - Preferences

/restaurants/{restaurantId}
  - Restaurant information
  - Staff assignments
  - /training_manuals/{manualId}
    - Training documents
    - Metadata
  - /quizzes/{quizId}
    - Quiz definitions
    - Questions
  - /quiz_results/{resultId}
    - Quiz submissions
    - Scores
  - /analytics/{date}
    - Daily analytics
    - Performance metrics

/users/{userId}/notifications/{notificationId}
  - User notifications
  - Reminders
  - Announcements

/restaurants/{restaurantId}/certificates/{certificateId}
  - Training certificates
  - Digital credentials

/restaurants/{restaurantId}/audit_logs/{logId}
  - Activity logs
  - Compliance tracking
```

## Setup Instructions

### 1. Firebase Project Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init firestore
firebase init storage
firebase init functions
```

### 2. Environment Configuration

Create `.env.local` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Firestore Security Rules

Deploy the security rules from `cloudDatabaseSchema.ts`:

```bash
firebase deploy --only firestore:rules
```

### 4. Create Indexes

Firestore will automatically suggest indexes. Deploy them:

```bash
firebase deploy --only firestore:indexes
```

## Usage Examples

### Using Firebase Service

```typescript
import { firebaseService } from '@/services/firebaseService';

// Create a user
const newUser = await firebaseService.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'staff',
  contactNumber: '+27123456789',
  loginPin: '1234',
  verificationStatus: 'pending'
});

// List users for a restaurant
const users = await firebaseService.listUsers(restaurantId);

// Submit quiz result
const result = await firebaseService.submitQuizResult({
  quizId: 'quiz-123',
  userId: 'user-456',
  restaurantId: 'rest-789',
  score: 85,
  totalQuestions: 25,
  passed: true,
  answers: [...]
});
```

### Using Cloud Storage Service

```typescript
import { cloudStorageService } from '@/services/cloudStorageService';

// Upload a file
const fileMetadata = await cloudStorageService.uploadFile(
  file,
  restaurantId,
  'manual',
  userId,
  (progress) => {
    console.log(`Upload progress: ${progress.progress}%`);
  }
);

// List files
const files = await cloudStorageService.listFiles(restaurantId, 'manual');

// Download a file
const blob = await cloudStorageService.downloadFile(fileId);
```

### Using Cloud Sync Context

```typescript
import { useCloudSync } from '@/contexts/CloudSyncContext';

function MyComponent() {
  const {
    isConnected,
    isSyncing,
    currentUser,
    users,
    restaurants,
    selectedRestaurant,
    notifications,
    refreshData,
    markNotificationAsRead
  } = useCloudSync();

  return (
    <div>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      <p>Users: {users.length}</p>
      <button onClick={refreshData}>Refresh Data</button>
    </div>
  );
}
```

## Real-Time Features

### Real-Time Listeners

The Firebase service provides real-time listeners for automatic data updates:

```typescript
// Listen to user changes
const unsubscribe = firebaseService.onUsersChange(
  restaurantId,
  (updatedUsers) => {
    console.log('Users updated:', updatedUsers);
  }
);

// Cleanup listener
unsubscribe();
```

### Automatic Sync

The CloudSyncContext automatically:
- Listens to user changes
- Monitors analytics updates
- Tracks restaurant changes
- Updates notifications in real-time

## Performance Optimization

### Pagination

For large datasets, implement pagination:

```typescript
// Fetch first 20 users
const users = await firebaseService.listUsers(restaurantId, { limit: 20 });

// Fetch next page
const moreUsers = await firebaseService.listUsers(restaurantId, {
  limit: 20,
  startAfter: lastUser
});
```

### Caching

Implement client-side caching:

```typescript
const cache = new Map();

async function getCachedUser(userId) {
  if (cache.has(userId)) {
    return cache.get(userId);
  }
  const user = await firebaseService.getUser(userId);
  cache.set(userId, user);
  return user;
}
```

### Offline Support

Enable offline persistence:

```typescript
import { enableIndexedDbPersistence } from 'firebase/firestore';

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open
    } else if (err.code == 'unimplemented') {
      // Browser doesn't support
    }
  });
```

## Security Best Practices

1. **Authentication**: Use Firebase Authentication with email/password or OAuth
2. **Authorization**: Implement role-based access control via security rules
3. **Data Validation**: Validate all data before writing to Firestore
4. **Encryption**: Enable encryption at rest (default in Firestore)
5. **Audit Logging**: Log all sensitive operations
6. **Rate Limiting**: Implement rate limiting for API calls

## Monitoring and Analytics

### Firebase Console

Monitor your application:
- Real-time database usage
- Storage usage
- Authentication metrics
- Error rates

### Custom Analytics

Track custom events:

```typescript
import { logEvent } from 'firebase/analytics';

logEvent(analytics, 'quiz_completed', {
  quizId: 'quiz-123',
  score: 85,
  restaurantId: 'rest-789'
});
```

## Troubleshooting

### Connection Issues

```typescript
// Check connection status
const isConnected = await firebaseService.testConnection();
if (!isConnected) {
  console.error('Firebase connection failed');
}
```

### Data Sync Issues

```typescript
// Force refresh data
const { refreshData } = useCloudSync();
await refreshData();
```

### Storage Issues

```typescript
// Check upload progress
const progress = cloudStorageService.getUploadProgress(fileId);
console.log(`Upload progress: ${progress.progress}%`);
```

## Migration Guide

### From Local Storage to Cloud

1. Export local data
2. Transform data to match cloud schema
3. Batch upload to Firestore
4. Verify data integrity
5. Update application to use cloud services

## Cost Optimization

### Firestore Pricing

- **Reads**: $0.06 per 100,000 reads
- **Writes**: $0.18 per 100,000 writes
- **Deletes**: $0.02 per 100,000 deletes
- **Storage**: $0.18 per GB

### Optimization Tips

1. Use batch operations
2. Implement data pagination
3. Cache frequently accessed data
4. Use indexes efficiently
5. Archive old data

## Support and Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## Next Steps

1. Set up Firebase project
2. Configure environment variables
3. Deploy security rules
4. Test cloud services
5. Implement data migration
6. Enable real-time features
7. Monitor performance
8. Optimize costs

---

**Last Updated**: October 2024
**Version**: 1.0
**Status**: Production Ready

