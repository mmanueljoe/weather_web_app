import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";


export const useWeatherContext = () => {
  const ctx = useContext(WeatherContext);

  if(!ctx){
    throw new Error('useWeather must be used within a WeatherProvider');
  }

  return ctx;

}