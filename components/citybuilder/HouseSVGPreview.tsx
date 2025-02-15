import React from 'react';
import { House, WeatherData } from './utils';
import HouseSVGCard from './HouseSVGCard';

interface HouseSVGPreviewProps {
  houses: House[];
  saving: { [key: number]: boolean };
  roofHeight: number;
  floorHeight: number;
  doorHeight: number;
  containerHeight: number;
  weather?: WeatherData;
}

const HouseSVGPreview: React.FC<HouseSVGPreviewProps> = ({ houses, saving, roofHeight, floorHeight, doorHeight, containerHeight, weather }) => {
  return (
    <div className="house-svg-preview-container relative">
      {weather && (
        <div className="weather-overlay absolute top-2 right-2 flex items-center gap-2 pointer-events-none opacity-90 z-20">
          {weather.condition === 'sunny' && <span className="weather-icon text-yellow-500 text-5xl">☀️</span>}
          {weather.condition === 'rainy' && <span className="weather-icon text-blue-500 text-5xl">🌧️</span>}
          {weather.condition === 'snowy' && <span className="weather-icon text-blue-300 text-5xl">❄️</span>}
          <div className="weather-temp-box bg-white bg-opacity-70 px-2 py-1 rounded">
            <span className="weather-temp text-lg font-bold">{weather.temperature}°C</span>
          </div>
        </div>
      )}
      <div className="house-svg-container">
        {houses.map((house) => (
          <HouseSVGCard key={house.id} house={house} saving={saving[house.id]} roofHeight={roofHeight} floorHeight={floorHeight} doorHeight={doorHeight} containerHeight={containerHeight} />
        ))}
      </div>
    </div>
  );
};

export default HouseSVGPreview;
