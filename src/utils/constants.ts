/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: 'https://api.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
  INCLUDE_PARAMS: 'current,hours',
  UNITS: 'metric', // Celsius
  TIMEOUT: 10000, // 10 seconds
} as const;

/**
 * Default locations for user's first search
 */
export const DEFAULT_LOCATIONS = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Sydney',
] as const;

/**
 * Forecast configuration
 */
export const FORECAST_CONFIG = {
  HOURS_DISPLAYED: 24,
  GRID_COLUMNS_MOBILE: 2,
  GRID_COLUMNS_TABLET: 4,
  GRID_COLUMNS_DESKTOP: 6,
} as const;

/**
 * Temperature unit (can extend for Fahrenheit)
 */
export const TEMPERATURE_UNITS = {
  CELSIUS: 'C',
  FAHRENHEIT: 'F',
} as const;

/**
 * Weather condition categories
 */
export const WEATHER_CONDITIONS = {
  SUNNY: ['sunny', 'clear', 'clear sky'],
  CLOUDY: ['cloudy', 'overcast', 'cloud'],
  RAINY: ['rainy', 'rain', 'showers', 'drizzle'],
  STORMY: ['thunderstorm', 'storm', 'lightning'],
  SNOWY: ['snow', 'snowy'],
  WINDY: ['wind', 'windy'],
  FOGGY: ['fog', 'foggy'],
} as const;

/**
 * Error messages (user-friendly)
 */
export const ERROR_MESSAGES = {
  LOCATION_NOT_FOUND: 'Location not found. Please try another search.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  API_KEY_ERROR: 'API configuration error. Please refresh and try again.',
  API_RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

/**
 * Loading messages
 */
export const LOADING_MESSAGES = {
  FETCHING: 'Loading weather...',
  SEARCHING: 'Searching for location...',
  UPDATING: 'Updating weather...',
} as const;

/**
 * Tailwind theme colors (reference)
 */
export const COLORS = {
  PRIMARY: 'blue-500',
  SECONDARY: 'gray-500',
  SUCCESS: 'green-500',
  ERROR: 'red-500',
  WARNING: 'yellow-500',
} as const;