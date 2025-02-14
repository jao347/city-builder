'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Slider from '@mui/material/Slider';

interface House {
  id: number;
  name: string;
  floors: number;
  color: string;
}

interface WeatherData {
  condition: 'sunny' | 'rainy' | 'snowy';
  temperature: number;
}

const fetchWeather = async (location: string): Promise<WeatherData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  switch (location) {
    case 'New York':
      return { condition: 'rainy', temperature: 15 };
    case 'Los Angeles':
      return { condition: 'sunny', temperature: 25 };
    case 'Chicago':
      return { condition: 'snowy', temperature: -5 };
    default:
      return { condition: 'sunny', temperature: 20 };
  }
};

// Keyframes for the building growth animation
const buildAnimation = `
  @keyframes buildAnimation {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
`;

const CityBuilder: React.FC = () => {
  // State for houses and weather
  const [houses, setHouses] = useState<House[]>([{ id: 1, name: 'House 1', floors: 3, color: 'orange' }]);
  const [location, setLocation] = useState<string>('New York');
  const { data: weather, refetch } = useQuery<WeatherData>({
    queryKey: ['weather', location],
    queryFn: () => fetchWeather(location),
    enabled: false,
  });

  // Handlers
  const addHouse = () => {
    const newHouse: House = {
      id: houses.length + 1,
      name: `House ${houses.length + 1}`,
      floors: 1,
      color: 'blue',
    };
    setHouses([...houses, newHouse]);
  };

  const updateHouse = (id: number, key: keyof House, value: string | number) => {
    setHouses(houses.map((house) => (house.id === id ? { ...house, [key]: value } : house)));
  };

  const removeHouse = (id: number) => {
    setHouses(houses.filter((house) => house.id !== id));
  };

  // Drawing constants
  const roofHeight = 40; // Height of the roof (used both as extra apex space and for alignment)
  const floorHeight = 40; // Height of each floor
  const doorHeight = 30; // Height of the door
  // For this example, we'll assume a fixed overall container height.
  // (You might compute this dynamically based on a maximum floor count.)
  const containerHeight = 440;

  return (
    <div className="p-4 max-w-full mx-auto">
      {/* Inject keyframes */}
      <style>{buildAnimation}</style>

      {/* Weather Section */}
      <div className="p-4 mb-4 bg-white shadow rounded">
        <h5 className="text-lg font-semibold mb-2">Display Weather</h5>
        <div className="flex items-center gap-2">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
          <button onClick={() => refetch()} className="bg-blue-500 text-white px-3 py-1 rounded">
            Get Weather
          </button>
        </div>
        {weather && (
          <div className="flex items-center gap-2 mt-2">
            {weather.condition === 'sunny' && <span className="text-yellow-500 text-4xl">☀️</span>}
            {weather.condition === 'rainy' && <span className="text-blue-500 text-4xl">🌧️</span>}
            {weather.condition === 'snowy' && <span className="text-blue-300 text-4xl">❄️</span>}
            <span className="text-xl">{weather.temperature}°C</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Panel: Houses List with MUI Slider */}
        <div className="p-4 bg-white shadow rounded">
          <h5 className="text-lg font-semibold mb-2">Houses List</h5>
          {houses.map((house) => (
            <div key={house.id} className="p-2 mb-2 border rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{house.name}</span>
                <button onClick={() => removeHouse(house.id)} className="text-red-500 text-xl">
                  &times;
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  value={house.color}
                  onChange={(e) => updateHouse(house.id, 'color', e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="orange">Orange</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
                <div className="flex flex-col gap-1">
                  <span>Floors: {house.floors}</span>
                  {/* MUI Slider for adjusting floors */}
                  <Slider
                    value={house.floors}
                    onChange={(_, newValue) => updateHouse(house.id, 'floors', newValue as number)}
                    min={1}
                    max={10}
                    valueLabelDisplay="auto"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addHouse} className="w-full mt-2 bg-green-500 text-white py-1 rounded">
            Build a new house
          </button>
        </div>

        {/* Right Panel: Houses SVG Preview with Labels */}
        <div className="relative p-4 bg-white shadow rounded">
          <div className="flex flex-wrap justify-center items-end gap-4 p-4 relative z-10">
            {houses.map((house) => {
              // Calculate the building height (floors × floorHeight)
              const buildingHeight = house.floors * floorHeight;
              // Compute roof's vertical position so that the roof's base aligns with the top of the building.
              // We want the bottom edge of the roof (the base of the triangle) to be at y = containerHeight - buildingHeight.
              const roofBaseY = containerHeight - buildingHeight;
              // The roof's apex will be placed above that by roofHeight.
              const roofApexY = roofBaseY - roofHeight;
              // The building part starts exactly at roofBaseY.
              const buildingY = roofBaseY;
              return (
                <div key={house.id} className="text-center">
                  <svg width={120} height={containerHeight} viewBox={`0 0 120 ${containerHeight}`}>
                    {/* Roof: drawn as a triangle where the base is at y = roofBaseY */}
                    <polygon
                      points={`0,${roofBaseY} 120,${roofBaseY} 60,${roofApexY}`}
                      fill="red"
                      stroke="black"
                      strokeWidth="2"
                    />
                    {/* Building part: drawn immediately below the roof's base */}
                    <g
                      transform={`translate(0, ${buildingY})`}
                      style={{
                        transformOrigin: '50% 100%',
                        animation: `${buildAnimation} 1s ease-out forwards`,
                      }}
                    >
                      <rect
                        x="0"
                        y="0"
                        width={120}
                        height={buildingHeight}
                        fill={house.color}
                        stroke="black"
                        strokeWidth="2"
                      />
                      {house.floors > 1 &&
                        Array.from({ length: house.floors - 1 }).map((_, idx) => (
                          <React.Fragment key={`floor-${idx}`}>
                            <rect
                              x="15"
                              y={(idx + 1) * floorHeight - 20}
                              width="20"
                              height="20"
                              fill="white"
                              stroke="black"
                            />
                            <rect
                              x="85"
                              y={(idx + 1) * floorHeight - 20}
                              width="20"
                              height="20"
                              fill="white"
                              stroke="black"
                            />
                          </React.Fragment>
                        ))}
                      <rect
                        x="45"
                        y={buildingHeight - doorHeight}
                        width="30"
                        height={doorHeight}
                        fill="brown"
                        stroke="black"
                        strokeWidth="2"
                      />
                    </g>
                    {/* Chimney: drawn on the roof area */}
                    <rect
                      x="80"
                      y={roofBaseY - 35}
                      width="10"
                      height="20"
                      fill="gray"
                      stroke="black"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="mt-1 font-semibold">{house.name}</div>
                </div>
              );
            })}
          </div>

          {weather && (
            <div className="absolute top-2 right-2 flex items-center gap-2 pointer-events-none opacity-90">
              {weather.condition === 'sunny' && <span className="text-yellow-500 text-5xl">☀️</span>}
              {weather.condition === 'rainy' && <span className="text-blue-500 text-5xl">🌧️</span>}
              {weather.condition === 'snowy' && <span className="text-blue-300 text-5xl">❄️</span>}
              <div className="bg-white bg-opacity-70 px-2 py-1 rounded">
                <span className="text-lg font-bold">{weather.temperature}°C</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityBuilder;
