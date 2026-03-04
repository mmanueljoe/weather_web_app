/**
 * Format temperature for display
 * @param temp Temperature in Celsius
 * @returns Formatted string like "20°C"
 */
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

/**
 * Format wind speed for display
 * @param speed Wind speed in km/h
 * @returns Formatted string like "20 km/h"
 */
export const formatWindSpeed = (speed: number): string => {
  return `${Math.round(speed)} km/h`;
};

/**
 * Format rain probability for display
 * @param probability 0-100 percentage
 * @returns Formatted string like "30%"
 */
export const formatRainProbability = (probability: number): string => {
  return `${Math.round(probability)}%`;
};

/**
 * Format humidity for display
 * @param humidity 0-100 percentage
 * @returns Formatted string like "65%"
 */
export const formatHumidity = (humidity: number): string => {
  return `${Math.round(humidity)}%`;
};

/**
 * Format time string for display
 * Converts "14:30:00" to "2:30 PM"
 * @param timeStr Time in 24-hour format
 * @returns Time in 12-hour format with AM/PM
 */
export const formatTimeString = (timeStr: string): string => {
  try {
    const [hours, minutes] = timeStr.split(':');
    const hour = Number.parseInt(hours, 10);
    const minute = Number.parseInt(minutes, 10);

    const date = new Date(2000, 0, 1, hour, minute);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return timeStr;
  }
};

/**
 * Format location name (capitalize first letter)
 * @param location Location string
 * @returns Capitalized location
 */
export const formatLocation = (location: string): string => {
  return location
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format weather condition (capitalize and clean up)
 * @param condition Raw condition string from API
 * @returns Formatted condition like "Partly Cloudy"
 */
export const formatWeatherCondition = (condition: string): string => {
  return condition
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Convert temperature Celsius to Fahrenheit (future feature)
 * @param celsius Temperature in Celsius
 * @returns Temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Get weather-appropriate background color
 * @param condition Weather condition string
 * @returns Tailwind color class
 */
export const getWeatherColor = (
  condition: string
): 'from-blue-400' | 'from-gray-400' | 'from-orange-400' | 'from-purple-400' => {
  const cond = condition.toLowerCase();

  if (cond.includes('sunny') || cond.includes('clear')) {
    return 'from-orange-400'; // Sunny = warm orange
  }
  if (cond.includes('cloud')) {
    return 'from-gray-400'; // Cloudy = gray
  }
  if (cond.includes('rain') || cond.includes('storm')) {
    return 'from-purple-400'; // Rainy = purple
  }
  return 'from-blue-400'; // Default = blue
};

/**
 * Get weather emoji based on condition
 * @param condition Weather condition
 * @returns Appropriate emoji
 */
export const getWeatherEmoji = (condition: string): string => {
  const cond = condition.toLowerCase();

  const emojiMap: Record<string, string> = {
    'sunny': '☀️',
    'clear': '☀️',
    'rainy': '🌧️',
    'rain': '🌧️',
    'cloudy': '☁️',
    'cloud': '☁️',
    'partly cloudy': '⛅',
    'snowy': '❄️',
    'snow': '❄️',
    'stormy': '⛈️',
    'storm': '⛈️',
    'windy': '💨',
    'wind': '💨',
    'fog': '🌫️',
    'drizzle': '🌤️',
  };

  // Find matching emoji
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (cond.includes(key)) {
      return emoji;
    }
  }

  return '🌤️'; // Default fallback
};