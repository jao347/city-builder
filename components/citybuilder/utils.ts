export interface House {
  id: number;
  name: string;
  floors: number;
  color: string;
}

export interface WeatherData {
  condition: 'sunny' | 'rainy' | 'snowy';
  temperature: number;
}
