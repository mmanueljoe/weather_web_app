import { useContext } from "react";
import { WeatherContext } from "@/context/WeatherContext";


/**
 * Custom hook to access weather context
 * Must be used within WeatherProvider
 * 
 * Usage:
 *   const { currentWeather, loading, error } = useWeather();
 *   const { searchLocation } = useWeather();
 */
export const useWeather = () => {
  const context = useContext(WeatherContext);

  // Guard: Provide helpful error if hook is used wrong
  if (!context) {
    throw new Error(
      'useWeather must be used within a <WeatherProvider>. ' +
      'Make sure your component is wrapped in App.tsx inside the provider.'
    );
  }

  return context;
};
