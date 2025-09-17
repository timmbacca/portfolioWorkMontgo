import ReactGA from 'react-ga4';

/**
 * Extends the Window interface to avoid TypeScript errors
 */
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Retrieves the CSP nonce from existing <script nonce="..."> tags.
 */
const getCSPNonce = (): string => {
  return document?.querySelector('script[nonce]')?.getAttribute('nonce') || '';
};

/**
 * Injects the Google Analytics script with a nonce for security.
 * @param measurementId - The Google Analytics Measurement ID.
 */
const injectGAScript = (measurementId: string) => {
  const nonce = getCSPNonce(); 

  
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  script.setAttribute('nonce', nonce); 
  document.head.appendChild(script);

  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: any[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);
};

/**
 * Initializes Google Analytics with the provided Measurement ID.
 */
export const initializeAnalytics = (): void => {
  const measurementId = 'G-0X65LT19W0'; 
  injectGAScript(measurementId);
  ReactGA.initialize(measurementId);
};

/**
 * Logs a page view to Google Analytics.
 */
export const logPageView = (): void => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

/**
 * Logs an event to Google Analytics.
 * @param category - The category of the event.
 * @param action - The action performed.
 * @param label - (Optional) Additional label for the event.
 */
export const logEvent = (
  category: string,
  action: string,
  label?: string
): void => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
