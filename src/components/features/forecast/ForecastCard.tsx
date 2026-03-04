import { WeatherIcon } from "@/components/common";


interface ForecastCardProps {
  time: string;
  temperature: number;
  description: string;
  rainProbability: number;
  windSpeed: number;
}


export const ForecastCard = (
    {time, temperature, description, rainProbability, windSpeed}: ForecastCardProps
) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 border border-gray-200">
      {/* Time */}
      <p className="font-bold text-gray-700 text-center mb-2">{time}</p>

      {/* Icon */}
      <div className="flex justify-center mb-3">
        <WeatherIcon condition={description} size="small" />
      </div>

      {/* Temperature */}
      <p className="text-center text-2xl font-bold text-gray-800 mb-3">
        {Math.round(temperature)}°
      </p>

      {/* Description */}
      <p className="text-center text-sm text-gray-600 capitalize mb-2">
        {description}
      </p>

      {/* Details */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💧 {rainProbability}%</p>
        <p>💨 {Math.round(windSpeed)} km/h</p>
      </div>
    </div>
  )
}