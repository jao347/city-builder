'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { House, WeatherData } from './utils';
import WeatherSection from './WeatherSection';
import HouseList from './HouseList';
import HouseSVGPreview from './HouseSVGPreview';
import './style.css';

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

const buildAnimation = `
  @keyframes buildAnimation {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
`;

const CityBuilder: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([{ id: 1, name: 'House 1', floors: 3, color: 'orange' }]);
  const [location, setLocation] = useState<string>('New York');
  const { data: weather, refetch } = useQuery<WeatherData>({
    queryKey: ['weather', location],
    queryFn: () => fetchWeather(location),
    enabled: false,
  });
  const [edits, setEdits] = useState<{ [key: number]: Partial<House> }>({});
  const [saving, setSaving] = useState<{ [key: number]: boolean }>({});
  const [buildingNew, setBuildingNew] = useState(false);

  const addHouse = (floors: number, color: string) => {
    setBuildingNew(true);
    setTimeout(() => {
      const newHouse: House = {
        id: houses.length + 1,
        name: `House ${houses.length + 1}`,
        floors,
        color,
      };
      setHouses([...houses, newHouse]);
      setBuildingNew(false);
    }, 1000);
  };

  const updateEdit = (id: number, key: keyof House, value: string | number) => {
    setEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const saveHouse = (id: number) => {
    setSaving((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const house = houses.find((h) => h.id === id);
      if (!house) return;
      const newData = edits[id] || {};
      const updatedHouse = { ...house, ...newData };
      setHouses(houses.map((h) => (h.id === id ? updatedHouse : h)));
      setEdits((prev) => {
        const newEdits = { ...prev };
        delete newEdits[id];
        return newEdits;
      });
      setSaving((prev) => ({ ...prev, [id]: false }));
    }, 1000);
  };

  const removeHouse = (id: number) => {
    setHouses(houses.filter((house) => house.id !== id));
    setEdits((prev) => {
      const newEdits = { ...prev };
      delete newEdits[id];
      return newEdits;
    });
  };

  const roofHeight = 40;
  const floorHeight = 40;
  const doorHeight = 30;
  const containerHeight = 440;

  return (
    <div className="city-builder-container">
      <style>{buildAnimation}</style>
      <WeatherSection location={location} setLocation={setLocation} weather={weather} refetch={refetch} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HouseList houses={houses} edits={edits} saving={saving} updateEdit={updateEdit} saveHouse={saveHouse} removeHouse={removeHouse} addHouse={addHouse} buildingNew={buildingNew} />
        <HouseSVGPreview houses={houses} saving={saving} roofHeight={roofHeight} floorHeight={floorHeight} doorHeight={doorHeight} containerHeight={containerHeight} weather={weather} />
      </div>
    </div>
  );
};

export default CityBuilder;
