import React from 'react';
import { House } from './utils';
import Slider from '@mui/material/Slider';
import DeleteIcon from '@mui/icons-material/Delete';
import HardwareIcon from '@mui/icons-material/Hardware';

const HouseEditCard: React.FC<{
  house: House;
  editedFloors: number;
  editedColor: string;
  hasEdits: boolean;
  saving: boolean | undefined;
  updateEdit: (id: number, key: keyof House, value: string | number) => void;
  saveHouse: (id: number) => void;
  removeHouse: (id: number) => void;
}> = ({ house, editedFloors, editedColor, hasEdits, saving, updateEdit, saveHouse, removeHouse }) => {
  return (
    <div className="house-card">
      <div className="house-card-header">
        <span className="house-card-name">{house.name}</span>
        <button onClick={() => removeHouse(house.id)} className="house-delete-button">
          <DeleteIcon />
        </button>
      </div>
      <div className="house-control">
        <div className="house-control-left">
          <div className="house-input-row">
            <label htmlFor={`floor-input-${house.id}`} className="house-label">
              Floors:
            </label>
            <input id={`floor-input-${house.id}`} type="number" value={editedFloors} min="1" max="10" onChange={(e) => updateEdit(house.id, 'floors', parseInt(e.target.value, 10) || 1)} className="house-input" />
          </div>
          <div className="house-slider-row">
            <Slider value={editedFloors} onChange={(_, newValue) => updateEdit(house.id, 'floors', newValue as number)} min={1} max={10} valueLabelDisplay="auto" className="house-slider" />
          </div>
        </div>
        <div className="house-control-right">
          <div className="house-input-row">
            <label htmlFor={`color-select-${house.id}`} className="house-label">
              Color:
            </label>
            <select id={`color-select-${house.id}`} value={editedColor} onChange={(e) => updateEdit(house.id, 'color', e.target.value)} className="house-select">
              <option value="orange">Orange</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
          </div>
          <div className="house-save-row">
            {hasEdits &&
              (saving ? (
                <img src="/hammer.gif" alt="Saving..." className="house-saving-icon" />
              ) : (
                <button onClick={() => saveHouse(house.id)} className="house-save-button">
                  <HardwareIcon />
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseEditCard;
