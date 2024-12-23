import ReactGA from 'react-ga4';

/**
 * Initializes Google Analytics with the provided Measurement ID.
 */
export const initializeAnalytics = (): void => {
  ReactGA.initialize('G-0X65LT19W0'); // Replace with your Measurement ID
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
