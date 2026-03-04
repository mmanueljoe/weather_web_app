import { WeatherIcon } from "@/components/common";

interface CurrentWeatherCardProps {
  location: string;
  temperature: number;
  feelsLike: number;
  description: string;
  windSpeed: number;
  rainProbability: number;
  humidity: number;
}

const CurrentWeatherCard = ({
  location,
  temperature,
  feelsLike,
  description,
  windSpeed,
  rainProbability,
  humidity,
}: CurrentWeatherCardProps) => {
  return (
    <div className="bg-linear-to-br from-blue-400 to-blue-600 text-white p-8 rounded-lg shadow-lg">
      {/* Header with location */}
      <h2 className="text-3xl font-bold mb-2">{location}</h2>

      {/* Main temperature */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-1">
          <p className="text-6xl font-bold">{Math.round(temperature)}°C</p>
          <p className="text-lg opacity-90">
            Feels like {Math.round(feelsLike)}°C
          </p>
        </div>
        <WeatherIcon condition={description} size="large" />
      </div>

      {/* Description */}
      <p className="text-xl mb-6 capitalize">{description}</p>

      {/* Details grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="opacity-75 text-sm">Wind Speed</p>
          <p className="text-2xl font-bold">{Math.round(windSpeed)} km/h</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="opacity-75 text-sm">Rain Chance</p>
          <p className="text-2xl font-bold">{rainProbability}%</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="opacity-75 text-sm">Humidity</p>
          <p className="text-2xl font-bold">{humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
