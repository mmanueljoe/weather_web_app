import type { WeatherData } from '@/context'

/**
 * Validate location input
 * @param location User-entered location string
 * @returns Error message or null if valid
 */
export const validateLocation = (location: string): string | null => {
  // Empty check
  if (!location || location.trim().length === 0) {
    return 'Please enter a location';
  }

  // Length check
  if (location.trim().length < 2) {
    return 'Location must be at least 2 characters';
  }

  if (location.length > 100) {
    return 'Location name is too long';
  }

  // Invalid characters (no numbers or special chars)
  if (!/^[a-zA-Z\s\-,.]+$/.test(location)) {
    return 'Location contains invalid characters';
  }

  return null; // Valid
};

/**
 * Check if temperature value is reasonable
 * @param temp Temperature in Celsius
 * @returns True if temperature is reasonable (-50 to 60°C)
 */
export const isValidTemperature = (temp: number): boolean => {
  return typeof temp === 'number' && temp >= -50 && temp <= 60;
};

/**
 * Check if probability is 0-100
 * @param value Probability value
 * @returns True if 0-100
 */
export const isValidProbability = (value: number): boolean => {
  return typeof value === 'number' && value >= 0 && value <= 100;
};

/**
 * Check if wind speed is reasonable
 * @param speed Wind speed in km/h
 * @returns True if speed is reasonable (0-500 km/h)
 */
export const isValidWindSpeed = (speed: number): boolean => {
  return typeof speed === 'number' && speed >= 0 && speed <= 500;
};

/**
 * Validate entire weather data object
 * @param data Weather data to validate
 * @returns Array of errors or empty array if valid
 */
export const validateWeatherData = (data: WeatherData): string[] => {
  const errors: string[] = [];

  if (!isValidTemperature(data?.temperature)) {
    errors.push('Invalid temperature');
  }

  if (!isValidProbability(data?.rainProbability)) {
    errors.push('Invalid rain probability');
  }

  if (!isValidWindSpeed(data?.windSpeed)) {
    errors.push('Invalid wind speed');
  }

  if (!data?.location || typeof data.location !== 'string') {
    errors.push('Invalid location');
  }

  return errors;
};