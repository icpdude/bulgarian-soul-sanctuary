// Production monitoring and analytics utilities

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  timeToInteractive?: number;
}

export const capturePerformanceMetrics = (): PerformanceMetrics | null => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  const metrics: PerformanceMetrics = {
    loadTime: navigation?.loadEventEnd - navigation?.fetchStart || 0,
  };

  paint.forEach((entry) => {
    if (entry.name === 'first-contentful-paint') {
      metrics.firstContentfulPaint = entry.startTime;
    }
  });

  return metrics;
};

export const logError = (error: Error, context?: Record<string, any>) => {
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
};

export const trackUserInteraction = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (process.env.NODE_ENV === 'production') {
    // Track events (integrate with analytics platform)
    console.log('Event:', eventName, properties);
  }
};

export const monitorWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Observe Largest Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('LCP:', entry);
    }
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Browser doesn't support this metric
  }
};
