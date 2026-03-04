export interface WeatherData{
    location: string;
    temperature: number;
    feelsLike: number;
    description: string;
    windSpeed: number;
    rainProbability: number;
    humidity: number;
    uvIndex: number;
    sunrise: string;
    sunset: string;
    lastUpdated: string;
}


export interface HourlyForecast{
    time: string;
    temperature: number;
    description: string;
    rainProbability: number;
    windSpeed: number;
}

export interface WeatherContextType {
    // state
    currentWeather: WeatherData | null;
    hourlyForecast: HourlyForecast[];
    loading: boolean;
    error: string | null;
    selectedLocation: string;

    // actions (functions to update state)
    searchLocation: (location: string) => Promise<void>;
    refreshWeather: () => Promise<void>;
    clearError: () => void;
}