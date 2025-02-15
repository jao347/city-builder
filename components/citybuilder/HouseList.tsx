import React, { useState } from 'react';
import { House } from './utils';
import HouseEditCard from './HouseEditCard';
import HouseIcon from '@mui/icons-material/House';

interface HouseListProps {
  houses: House[];
  edits: { [key: number]: Partial<House> };
  saving: { [key: number]: boolean };
  updateEdit: (id: number, key: keyof House, value: string | number) => void;
  saveHouse: (id: number) => void;
  removeHouse: (id: number) => void;
  addHouse: (floors: number, color: string) => void;
  buildingNew: boolean;
}

const HouseList: React.FC<HouseListProps> = ({ houses, edits, saving, updateEdit, saveHouse, removeHouse, addHouse, buildingNew }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newHouseFloors, setNewHouseFloors] = useState(1);
  const [newHouseColor, setNewHouseColor] = useState('blue');

  const handleAddHouse = () => {
    addHouse(newHouseFloors, newHouseColor);
    setModalOpen(false);
  };

  return (
    <div className="houses-list">
      <h5 className="houses-list-title">Houses List</h5>
      {houses.map((house) => {
        const editedFloors = edits[house.id]?.floors ?? house.floors;
        const editedColor = edits[house.id]?.color ?? house.color;
        const hasEdits = edits[house.id] && Object.keys(edits[house.id]!).length > 0;
        return <HouseEditCard key={house.id} house={house} editedFloors={editedFloors} editedColor={editedColor} hasEdits={hasEdits} saving={saving[house.id]} updateEdit={updateEdit} saveHouse={saveHouse} removeHouse={removeHouse} />;
      })}
      <button onClick={() => setModalOpen(true)} disabled={buildingNew} className="build-button">
        {buildingNew ? (
          <img src="/build-loader.gif" alt="Building..." className="build-loader" />
        ) : (
          <>
            <HouseIcon className="h-5 w-5" /> Build a new house
          </>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Add a New House</h3>
            <div className="mb-4">
              <label htmlFor="new-house-floors" className="block text-sm font-medium mb-1">
                Floors:
              </label>
              <input id="new-house-floors" type="number" value={newHouseFloors} min="1" max="10" onChange={(e) => setNewHouseFloors(parseInt(e.target.value, 10) || 1)} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="new-house-color" className="block text-sm font-medium mb-1">
                Color:
              </label>
              <select id="new-house-color" value={newHouseColor} onChange={(e) => setNewHouseColor(e.target.value)} className="w-full p-2 border rounded ">
                <option value="blue">Blue</option>
                <option value="orange">Orange</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleAddHouse} className="px-4 py-2 bg-blue-500 text-white rounded">
                Add House
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseList;
