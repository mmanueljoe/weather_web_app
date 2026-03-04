import { useWeather } from '@/hooks/useWeather';
import { LocationInput, ErrorMessage, LoadingSpinner } from '@/components/common';
import { CurrentWeatherCard } from '@/components/features/current-weather/CurrentWeatherCard'
import { ForecastList } from '@/components/features/forecast/ForecastList';


export const MainContent = () => {
  // Get everything from Context via hook
  const { 
    currentWeather, 
    hourlyForecast, 
    loading, 
    error, 
    clearError, 
    searchLocation 
  } = useWeather();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-blue-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          ⛅ Weather App
        </h1>

        {/* Search Input */}
        <div className="mb-8">
          <LocationInput 
            onSearch={searchLocation}
            isLoading={loading}
          />
        </div>

        {/* Loading Spinner */}
        {loading && !currentWeather && (
          <div className="flex justify-center py-12">
            <LoadingSpinner message="Loading weather..." size="large" />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <ErrorMessage 
              message={error} 
              onDismiss={clearError}
            />
          </div>
        )}

        {/* Current Weather Card */}
        {currentWeather && (
          <div className="mb-8">
            <CurrentWeatherCard
              location={currentWeather.location}
              temperature={currentWeather.temperature}
              feelsLike={currentWeather.feelsLike}
              description={currentWeather.description}
              windSpeed={currentWeather.windSpeed}
              rainProbability={currentWeather.rainProbability}
              humidity={currentWeather.humidity}
            />
          </div>
        )}

        {/* Hourly Forecast */}
        {currentWeather && hourlyForecast.length > 0 && (
          <div>
            <ForecastList 
              forecast={hourlyForecast}
              isLoading={loading}
            />
          </div>
        )}

        {/* No Data Message */}
        {!loading && !currentWeather && !error && (
          <div className="text-center py-12">
            <p className="text-white text-xl">
              👈 Enter a location to see the weather
            </p>
          </div>
        )}
      </div>
    </div>
  );
};