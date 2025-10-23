// Cloud Storage Service - File Management and Upload
// Handles file uploads, downloads, and storage management

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedDate: string;
  restaurantId: string;
  category: 'manual' | 'document' | 'certificate' | 'report';
  status: 'active' | 'archived';
  downloadUrl: string;
}

export interface UploadProgress {
  fileName: string;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  error?: string;
}

export class CloudStorageService {
  private static instance: CloudStorageService;
  private uploadProgress: Map<string, UploadProgress> = new Map();

  private constructor() {
    this.initializeStorage();
  }

  static getInstance(): CloudStorageService {
    if (!CloudStorageService.instance) {
      CloudStorageService.instance = new CloudStorageService();
    }
    return CloudStorageService.instance;
  }

  private initializeStorage() {
    console.log('Cloud storage service initialized');
  }

  /**
   * Upload a file to cloud storage
   */
  async uploadFile(
    file: File,
    restaurantId: string,
    category: FileMetadata['category'],
    userId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<FileMetadata> {
    const fileId = this.generateFileId();
    const uploadKey = `${fileId}-${file.name}`;

    try {
      // Initialize upload progress
      const progress: UploadProgress = {
        fileName: file.name,
        progress: 0,
        status: 'uploading'
      };
      this.uploadProgress.set(uploadKey, progress);
      onProgress?.(progress);

      // Simulate file upload with progress
      const fileMetadata = await this.simulateFileUpload(
        file,
        fileId,
        restaurantId,
        category,
        userId,
        (progressPercent) => {
          const updatedProgress: UploadProgress = {
            fileName: file.name,
            progress: progressPercent,
            status: 'uploading'
          };
          this.uploadProgress.set(uploadKey, updatedProgress);
          onProgress?.(updatedProgress);
        }
      );

      // Mark as completed
      const completedProgress: UploadProgress = {
        fileName: file.name,
        progress: 100,
        status: 'completed'
      };
      this.uploadProgress.set(uploadKey, completedProgress);
      onProgress?.(completedProgress);

      return fileMetadata;
    } catch (error) {
      const errorProgress: UploadProgress = {
        fileName: file.name,
        progress: 0,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Upload failed'
      };
      this.uploadProgress.set(uploadKey, errorProgress);
      onProgress?.(errorProgress);
      throw error;
    }
  }

  /**
   * Download a file from cloud storage
   */
  async downloadFile(fileId: string): Promise<Blob> {
    try {
      console.log('Downloading file:', fileId);
      // Fetch file from cloud storage
      const response = await fetch(`/api/files/${fileId}/download`);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      return await response.blob();
    } catch (error) {
      console.error('File download error:', error);
      throw error;
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(fileId: string): Promise<FileMetadata | null> {
    try {
      console.log('Fetching file metadata:', fileId);
      const response = await fetch(`/api/files/${fileId}/metadata`);
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching file metadata:', error);
      return null;
    }
  }

  /**
   * List files in a restaurant
   */
  async listFiles(
    restaurantId: string,
    category?: FileMetadata['category']
  ): Promise<FileMetadata[]> {
    try {
      console.log('Listing files for restaurant:', restaurantId, 'category:', category);
      const params = new URLSearchParams({ restaurantId });
      if (category) {
        params.append('category', category);
      }
      const response = await fetch(`/api/files?${params}`);
      if (!response.ok) {
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  /**
   * Delete a file from cloud storage
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      console.log('Deleting file:', fileId);
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  /**
   * Archive a file (soft delete)
   */
  async archiveFile(fileId: string): Promise<void> {
    try {
      console.log('Archiving file:', fileId);
      const response = await fetch(`/api/files/${fileId}/archive`, {
        method: 'PATCH'
      });
      if (!response.ok) {
        throw new Error('Failed to archive file');
      }
    } catch (error) {
      console.error('Error archiving file:', error);
      throw error;
    }
  }

  /**
   * Get upload progress
   */
  getUploadProgress(fileId: string): UploadProgress | undefined {
    return this.uploadProgress.get(fileId);
  }

  /**
   * Get all active uploads
   */
  getActiveUploads(): UploadProgress[] {
    return Array.from(this.uploadProgress.values()).filter(
      p => p.status === 'uploading'
    );
  }

  /**
   * Clear upload progress
   */
  clearUploadProgress(fileId: string): void {
    this.uploadProgress.delete(fileId);
  }

  // Private helper methods

  private generateFileId(): string {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private async simulateFileUpload(
    file: File,
    fileId: string,
    restaurantId: string,
    category: FileMetadata['category'],
    userId: string,
    onProgress: (progress: number) => void
  ): Promise<FileMetadata> {
    return new Promise((resolve, reject) => {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Return file metadata
          const metadata: FileMetadata = {
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedBy: userId,
            uploadedDate: new Date().toISOString(),
            restaurantId,
            category,
            status: 'active',
            downloadUrl: `/api/files/${fileId}/download`
          };

          resolve(metadata);
        } else {
          onProgress(Math.min(progress, 99));
        }
      }, 500);

      // Simulate potential upload error (5% chance)
      if (Math.random() < 0.05) {
        clearInterval(interval);
        reject(new Error('Upload failed: Network error'));
      }
    });
  }
}

// Export singleton instance
export const cloudStorageService = CloudStorageService.getInstance();

