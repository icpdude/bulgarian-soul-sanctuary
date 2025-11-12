// Analytics tracking utilities

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

class Analytics {
  private static instance: Analytics;
  private events: AnalyticsEvent[] = [];
  private isProduction = import.meta.env.PROD;

  private constructor() {
    this.initializeTracking();
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private initializeTracking() {
    if (this.isProduction && typeof window !== 'undefined') {
      // Track page views on route changes
      this.trackPageView();
    }
  }

  trackPageView(path?: string) {
    const pagePath = path || window.location.pathname;
    this.track('page_view', {
      path: pagePath,
      referrer: document.referrer,
      title: document.title,
    });
  }

  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);

    if (this.isProduction) {
      // Send to analytics service (integrate with Google Analytics, Plausible, etc.)
      console.log('Analytics Event:', event);
      
      // Example: Google Analytics integration
      // if (window.gtag) {
      //   window.gtag('event', eventName, properties);
      // }
    } else {
      console.log('📊 Analytics (dev):', event);
    }
  }

  trackClick(elementName: string, properties?: Record<string, any>) {
    this.track('click', {
      element: elementName,
      ...properties,
    });
  }

  trackFormSubmit(formName: string, properties?: Record<string, any>) {
    this.track('form_submit', {
      form: formName,
      ...properties,
    });
  }

  trackError(error: Error, context?: Record<string, any>) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      ...context,
    });
  }

  trackWalletConnection(walletType: string, success: boolean) {
    this.track('wallet_connection', {
      walletType,
      success,
    });
  }

  trackVote(proposalId: string, voteType: 'for' | 'against') {
    this.track('dao_vote', {
      proposalId,
      voteType,
    });
  }

  trackDonation(amount: number, method: string) {
    this.track('donation', {
      amount,
      method,
    });
  }

  getEvents() {
    return this.events;
  }

  clearEvents() {
    this.events = [];
  }
}

export const analytics = Analytics.getInstance();

// Convenience exports
export const trackPageView = (path?: string) => analytics.trackPageView(path);
export const trackClick = (element: string, props?: Record<string, any>) => 
  analytics.trackClick(element, props);
export const trackFormSubmit = (form: string, props?: Record<string, any>) => 
  analytics.trackFormSubmit(form, props);
export const trackError = (error: Error, context?: Record<string, any>) => 
  analytics.trackError(error, context);
export const trackWalletConnection = (walletType: string, success: boolean) =>
  analytics.trackWalletConnection(walletType, success);
export const trackVote = (proposalId: string, voteType: 'for' | 'against') =>
  analytics.trackVote(proposalId, voteType);
export const trackDonation = (amount: number, method: string) =>
  analytics.trackDonation(amount, method);
