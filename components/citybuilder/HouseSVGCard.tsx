import React from 'react';
import { House } from './utils';

const buildAnimation = `
  @keyframes buildAnimation {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
`;

const HouseSVGCard: React.FC<{
  house: House;
  saving: boolean | undefined;
  roofHeight: number;
  floorHeight: number;
  doorHeight: number;
  containerHeight: number;
}> = ({ house, saving, roofHeight, floorHeight, doorHeight, containerHeight }) => {
  const svgWidth = 150;
  const svgHeight = containerHeight;
  const buildingHeight = house.floors * floorHeight;
  const roofBaseY = containerHeight - buildingHeight;
  const roofApexY = roofBaseY - roofHeight;
  const buildingY = roofBaseY;
  return (
    <div className="house-svg-card">
      <div className="house-svg-wrapper">
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="house-svg">
          <polygon points={`0,${roofBaseY} ${svgWidth},${roofBaseY} ${svgWidth / 2},${roofApexY}`} fill="red" stroke="black" strokeWidth="2" />
          <g
            transform={`translate(0, ${buildingY})`}
            style={{
              transformOrigin: '50% 100%',
              animation: `${buildAnimation} 1s ease-out forwards`,
            }}
          >
            <rect x="0" y="0" width={svgWidth} height={buildingHeight} fill={house.color} stroke="black" strokeWidth="2" />
            {house.floors > 1 &&
              Array.from({ length: house.floors - 1 }).map((_, idx) => (
                <React.Fragment key={`floor-${idx}`}>
                  <rect x={svgWidth * 0.125} y={(idx + 1) * floorHeight - 20} width="20" height="20" fill="white" stroke="black" />
                  <rect x={svgWidth - svgWidth * 0.125 - 20} y={(idx + 1) * floorHeight - 20} width="20" height="20" fill="white" stroke="black" />
                </React.Fragment>
              ))}
            <rect x={svgWidth * 0.375} y={buildingHeight - doorHeight} width="30" height={doorHeight} fill="brown" stroke="black" strokeWidth="2" />
          </g>
          <rect x={svgWidth - 40} y={roofBaseY - 35} width="10" height="20" fill="gray" stroke="black" strokeWidth="1" />
        </svg>
        {saving && (
          <div className="house-svg-overlay">
            <img src="/build-loader.gif" alt="Saving..." className="house-saving-overlay" />
          </div>
        )}
      </div>
      <div className="house-name">{house.name}</div>
    </div>
  );
};

export default HouseSVGCard;
