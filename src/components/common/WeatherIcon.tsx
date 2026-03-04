interface WeatherIconProps {
    condition: string;
    size?: 'small' | 'medium' | 'large';
}

const WeatherIcon = ({condition, size = "medium"}: WeatherIconProps) => {
    const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

   // Map conditions to emojis (simple version)
  const iconMap: Record<string, string> = {
    'sunny': '☀️',
    'clear': '☀️',
    'rainy': '🌧️',
    'cloudy': '☁️',
    'partly cloudy': '⛅',
    'snowy': '❄️',
    'stormy': '⛈️',
  };

   const icon = iconMap[condition.toLowerCase()] || '🌤️';

  return (
     <div className={`${sizeClasses[size]} flex items-center justify-center text-center`}>
      {icon}
    </div>
  )
}

export default WeatherIcon