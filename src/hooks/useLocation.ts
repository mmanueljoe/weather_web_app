import { useCallback, useState } from "react";
import { useWeather } from "./useWeather";

interface LocationHistory {
  location: string;
  timestamp: number;
}

export const useLocation = () => {
  const { searchLocation } = useWeather();
  const [history, setHistory] = useState<LocationHistory[]>([]);

  const search = useCallback(
    async (location: string) => {
      await searchLocation(location);

      setHistory((prev) => {
        const isDuplicate = prev.some((item) => item.location === location);

        if (isDuplicate) return prev;

        const newHistory = [{ location, timestamp: Date.now() }, ...prev].slice(
          0,
          10,
        );

        return newHistory;
      });
    },
    [searchLocation],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    search,
    clearHistory,
    recentLocations: history.map((item) => item.location),
  };
};
