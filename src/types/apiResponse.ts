
export interface VisualCrossingResponse {
  address: string;
  currentConditions: {
    temp: number;
    feelslike: number;
    conditions: string;
    windspeed: number;
    precipprob: number;
    humidity: number;
    uvindex: number;
    sunrise: string;
    sunset: string;
    datetime: string;
  };
  days: Array<{
    hours: Array<{
      datetime: string;
      temp: number;
      conditions: string;
      precipprob: number;
      windspeed: number;
    }>;
  }>;
}