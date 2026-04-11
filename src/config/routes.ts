export const APP_ROUTES = {
  HOME: '/',
  ABOUT: '/heritage',
  SPORTS: {
    ROOT: '/sports',
    ARCHERY: '/sports/archery',
    TENT_PEGGING: '/sports/tent-pegging',
  },
  BOOKING: '/booking',
  DASHBOARD: {
    ROOT: '/portal',
    PERFORMANCE: '/portal/performance-tracking',
  }
} as const;

/**
 * Helper function to build dynamic routes and append query parameters if necessary
 */
export const buildRoute = (route: string, params?: Record<string, string | number>) => {
  if (!params) return route;
  
  let finalRoute = route;
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (finalRoute.includes(`:${key}`)) {
      finalRoute = finalRoute.replace(`:${key}`, String(value));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${finalRoute}?${queryString}` : finalRoute;
};
