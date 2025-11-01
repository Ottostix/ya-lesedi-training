/**
 * Security utilities for CSRF protection and input validation
 */

// Generate CSRF token
export function generateCSRFToken(): string {
  const token = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('csrf_token', token);
  return token;
}

// Get stored CSRF token
export function getCSRFToken(): string | null {
  return sessionStorage.getItem('csrf_token');
}

// Validate CSRF token
export function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFToken();
  return storedToken === token;
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
export function validatePasswordStrength(password: string): {
  isStrong: boolean;
  feedback: string[];
} {
  const feedback: string[] = [];
  
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain uppercase letters');
  }
  
  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain lowercase letters');
  }
  
  if (!/[0-9]/.test(password)) {
    feedback.push('Password must contain numbers');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    feedback.push('Password must contain special characters (!@#$%^&*)');
  }
  
  return {
    isStrong: feedback.length === 0,
    feedback,
  };
}

// Escape HTML entities
export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Validate file upload
export function validateFileUpload(
  file: File,
  allowedTypes: string[] = ['application/pdf', 'application/msword', 'text/plain'],
  maxSizeInMB: number = 10
): { valid: boolean; error?: string } {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }
  
  if (file.size > maxSizeInBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeInMB}MB limit`,
    };
  }
  
  return { valid: true };
}

// Rate limiting helper
export function isRateLimited(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem(`ratelimit_${key}`) || '[]');
  
  // Filter out old attempts
  const recentAttempts = attempts.filter((timestamp: number) => now - timestamp < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return true;
  }
  
  recentAttempts.push(now);
  localStorage.setItem(`ratelimit_${key}`, JSON.stringify(recentAttempts));
  
  return false;
}

// Clear rate limit
export function clearRateLimit(key: string): void {
  localStorage.removeItem(`ratelimit_${key}`);
}
