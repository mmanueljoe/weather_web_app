import React, { useCallback, useMemo, useState } from "react";
import { fetchWeather } from "@/services/weatherService";
import { WeatherContext } from "./WeatherContext";
import type { WeatherContextType, WeatherData, HourlyForecast } from "@/context/types";



interface WeatherProviderProps {
  children: React.ReactNode;
}

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    // fetch weather for a location
    const searchLocation = useCallback(async (location: string) => {
      if(!location.trim()){
        setError('Please enter a location');
        return;
      }

      setLoading(true);
      setError(null);


      try{
        const data = await fetchWeather(location);
        setCurrentWeather(data.current);
        setHourlyForecast(data.hourly);
        setSelectedLocation(location);
        setLoading(false);
      }catch(error){
        setError(error instanceof Error ? error.message : 'Failed to fetch weather data')
        setCurrentWeather(null);
        setHourlyForecast([]);
        setLoading(false);
      }finally{
        setLoading(false);
      }

    }, []);


    // refresh current location
    const refreshWeather = useCallback(async () => {
      if(!selectedLocation) return;

      await searchLocation(selectedLocation);

    }, [selectedLocation, searchLocation]);

    // clear error
    const clearError = useCallback(() => {
      setError(null);
    }, []);


    const value: WeatherContextType = useMemo(() => ({
      currentWeather,
      hourlyForecast,
      loading,
      error,
      selectedLocation,
      searchLocation,
      refreshWeather,
      clearError
    }), [currentWeather, hourlyForecast, loading, error, selectedLocation, searchLocation, refreshWeather, clearError]);
    
    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    );
};


