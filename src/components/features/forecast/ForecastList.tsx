import { LoadingSpinner } from "@/components/common";
import { ForecastCard } from "@/components/features/forecast/ForecastCard";


interface ForecastListProps {
  forecast: {
    time: string;
    temperature: number;
    description: string;
    rainProbability: number;
    windSpeed: number;
  }[];
  isLoading?: boolean;
}

export const ForecastList = (
    {forecast, isLoading}: ForecastListProps
) => {

    if (isLoading) {
    return <LoadingSpinner message="Loading forecast..." />;
  }

  if (forecast.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No forecast data available</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">24-Hour Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {forecast.map((hour) => (
          <ForecastCard
            key={hour.time}
            time={hour.time}
            temperature={hour.temperature}
            description={hour.description}
            rainProbability={hour.rainProbability}
            windSpeed={hour.windSpeed}
          />
        ))}
      </div>
    </div>
  );
}

