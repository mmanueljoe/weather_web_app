import type { WeatherData, HourlyForecast } from "@/context";
import type { VisualCrossingResponse } from "@/types/apiResponse";

const API_KEY = import.meta.env.VITE_API_KEY;

const API_BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

/**
 * Fetch weather data from Visual Crossing API
 * @param location - City name
 * @returns Object with current weather and hourly forecast
 */

export const fetchWeather = async (location: string) => {
  try {
    // validate input
    if (!location.trim()) {
      throw new Error("Location cannot be empty");
    }

    if (!API_KEY) {
      throw new Error("API key not found");
    }

    // build url
    const url = new URL(`${API_BASE_URL}${location}?key=${API_KEY}`);
    url.searchParams.append("key", API_KEY);
    url.searchParams.append("include", "current,hours");
    url.searchParams.append("units", "metric");

    // call API
    const response = await fetch(url);

    // handle HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("API key is invalid");
      } else if (response.status === 404) {
        throw new Error(`Location "${location}" not found`);
      } else if (response.status === 429) {
        throw new Error("API rate limit exceeded. Try again later.");
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    }

    // parse json
    const data: VisualCrossingResponse = await response.json();

    // transform api response into accepted format
    const current = transformCurrentWeather(data);
    const hourly = transformHourlyForecast(data);

    return { current, hourly };
  } catch (error) {
    // handle errors and provide user-friendly messages
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unknown error occurred");
  }
};

/**
 * Transform API's current conditions into our WeatherData format
 */
function transformCurrentWeather(data: VisualCrossingResponse): WeatherData {
  const current = data.currentConditions;

  return {
    location: data.address,
    temperature: Math.round(current.temp),
    feelsLike: Math.round(current.feelslike),
    description: current.conditions,
    windSpeed: Math.round(current.windspeed),
    rainProbability: Math.round(current.precipprob),
    humidity: Math.round(current.humidity),
    uvIndex: Math.round(current.uvindex),
    sunrise: formatTime(current.sunrise),
    sunset: formatTime(current.sunset),
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Transform API's hourly data into our HourlyForecast format
 */
function transformHourlyForecast(
  data: VisualCrossingResponse,
): HourlyForecast[] {
  const hours = data.days[0]?.hours || [];

  return hours.map((hour) => ({
    time: formatTime(hour.datetime),
    temperature: Math.round(hour.temp),
    description: hour.conditions,
    rainProbability: Math.round(hour.precipprob),
    windSpeed: Math.round(hour.windspeed),
  }));
}

/**
 * Helper: Format time string "14:30:00" to "2:30 PM"
 */
function formatTime(timeStr: string): string {
  try {
    const [hours, minutes] = timeStr.split(":");
    const hour = Number.parseInt(hours, 10);
    const minute = Number.parseInt(minutes, 10);

    return new Date(2000, 0, 1, hour, minute).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return timeStr; // Return original if parsing fails
  }
}
