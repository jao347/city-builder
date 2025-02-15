import React from 'react';
import { WeatherData } from './utils';

const WeatherSection: React.FC<{
  location: string;
  setLocation: (loc: string) => void;
  weather: WeatherData | undefined;
  refetch: () => void;
}> = ({ location, setLocation, weather, refetch }) => {
  return (
    <div className="weather-section">
      <h5 className="weather-title">Display Weather</h5>
      <div className="weather-controls">
        <select className="weather-select" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <button className="weather-button" onClick={refetch}>
          Get Weather
        </button>
      </div>
      {weather && (
        <div className="weather-display">
          {weather.condition === 'sunny' && <span className="weather-icon sunny">☀️</span>}
          {weather.condition === 'rainy' && <span className="weather-icon rainy">🌧️</span>}
          {weather.condition === 'snowy' && <span className="weather-icon snowy">❄️</span>}
          <span className="weather-temp">{weather.temperature}°C</span>
        </div>
      )}
    </div>
  );
};

export default WeatherSection;
