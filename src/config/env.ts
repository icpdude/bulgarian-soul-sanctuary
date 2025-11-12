// Environment configuration
// Access environment variables safely with fallbacks

export const env = {
  // App Info
  APP_NAME: 'Bulgarian Spiritual Treasury',
  APP_URL: import.meta.env.VITE_APP_URL || 'https://foundation-bst.org',
  
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || '',
  
  // Analytics
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || '',
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_TRACKING: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

// Type-safe environment access
export type Env = typeof env;

// Validate required environment variables in production
if (env.isProduction) {
  const requiredVars: Array<keyof Env> = [];
  
  requiredVars.forEach((key) => {
    if (!env[key]) {
      console.warn(`Missing environment variable: ${key}`);
    }
  });
}
