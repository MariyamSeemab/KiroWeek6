import React, { useState } from 'react';
import { CropType } from '../../types/storage';

interface CropSelectorProps {
  onCropSelect: (crop: CropType) => void;
  selectedCrop?: CropType | null;
}

const CropSelector: React.FC<CropSelectorProps> = ({ onCropSelect, selectedCrop }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCrop, setHoveredCrop] = useState<CropType | null>(null);

  const crops: CropType[] = [
    {
      id: 'wheat',
      name: 'Wheat',
      icon: '🌾',
      marketPrice: 2500,
      spoilageRate: {
        coldStorage: 0.02,
        solarDrying: 0.08
      }
    },
    {
      id: 'rice',
      name: 'Rice',
      icon: '🍚',
      marketPrice: 2200,
      spoilageRate: {
        coldStorage: 0.015,
        solarDrying: 0.06
      }
    },
    {
      id: 'corn',
      name: 'Corn',
      icon: '🌽',
      marketPrice: 1800,
      spoilageRate: {
        coldStorage: 0.025,
        solarDrying: 0.09
      }
    },
    {
      id: 'chili',
      name: 'Chili',
      icon: '🌶️',
      marketPrice: 8000,
      spoilageRate: {
        coldStorage: 0.03,
        solarDrying: 0.12
      }
    },
    {
      id: 'tomato',
      name: 'Tomato',
      icon: '🍅',
      marketPrice: 3500,
      spoilageRate: {
        coldStorage: 0.05,
        solarDrying: 0.15
      }
    },
    {
      id: 'onion',
      name: 'Onion',
      icon: '🧅',
      marketPrice: 2800,
      spoilageRate: {
        coldStorage: 0.02,
        solarDrying: 0.07
      }
    },
    {
      id: 'potato',
      name: 'Potato',
      icon: '🥔',
      marketPrice: 1500,
      spoilageRate: {
        coldStorage: 0.01,
        solarDrying: 0.05
      }
    },
    {
      id: 'soybean',
      name: 'Soybean',
      icon: '🫘',
      marketPrice: 4200,
      spoilageRate: {
        coldStorage: 0.02,
        solarDrying: 0.08
      }
    },
    {
      id: 'cotton',
      name: 'Cotton',
      icon: '🌱',
      marketPrice: 5500,
      spoilageRate: {
        coldStorage: 0.01,
        solarDrying: 0.04
      }
    },
    {
      id: 'sugarcane',
      name: 'Sugarcane',
      icon: '🎋',
      marketPrice: 3200,
      spoilageRate: {
        coldStorage: 0.08,
        solarDrying: 0.20
      }
    }
  ];

  const handleCropClick = (crop: CropType) => {
    onCropSelect(crop);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-700">Select Your Crop</h3>
      
      {/* Selected Crop Display */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className={`
            w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
            ${selectedCrop 
              ? 'border-gold bg-gold/5 gold-glow' 
              : 'border-slate-200 hover:border-gold/50 hover:bg-slate-50'
            }
          `}
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl" aria-hidden="true">
              {selectedCrop ? selectedCrop.icon : '🌾'}
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-slate-800">
                {selectedCrop ? selectedCrop.name : 'Choose a crop'}
              </h4>
              {selectedCrop && (
                <p className="text-sm text-slate-600">
                  ₹{selectedCrop.marketPrice}/quintal
                </p>
              )}
            </div>
          </div>
          <div className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            <div className="p-2">
              <div className="grid grid-cols-1 gap-1">
                {crops.map((crop) => (
                  <button
                    key={crop.id}
                    onClick={() => handleCropClick(crop)}
                    onMouseEnter={() => setHoveredCrop(crop)}
                    onMouseLeave={() => setHoveredCrop(null)}
                    className={`
                      flex items-center space-x-3 p-3 rounded-md transition-all duration-150 text-left w-full
                      ${selectedCrop?.id === crop.id 
                        ? 'bg-gold/10 border border-gold/30' 
                        : 'hover:bg-slate-50 border border-transparent'
                      }
                    `}
                  >
                    <div className="text-2xl" aria-hidden="true">{crop.icon}</div>
                    <div className="flex-1">
                      <h5 className="font-medium text-slate-800">{crop.name}</h5>
                      <p className="text-xs text-slate-500">₹{crop.marketPrice}/quintal</p>
                    </div>
                    {selectedCrop?.id === crop.id && (
                      <div className="text-gold" aria-hidden="true">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hover Details Card */}
      {hoveredCrop && isDropdownOpen && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 transition-all duration-200">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{hoveredCrop.icon}</span>
            <h4 className="font-semibold text-slate-800">{hoveredCrop.name}</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600 font-medium">Market Price</p>
              <p className="text-slate-800">₹{hoveredCrop.marketPrice}/quintal</p>
            </div>
            <div>
              <p className="text-slate-600 font-medium">Storage Loss Rates</p>
              <p className="text-slate-800">
                Cold: {(hoveredCrop.spoilageRate.coldStorage * 100).toFixed(1)}% | 
                Solar: {(hoveredCrop.spoilageRate.solarDrying * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Crop Summary */}
      {selectedCrop && !isDropdownOpen && (
        <div className="mt-4 p-3 bg-gold/10 rounded-lg border border-gold/20" role="status" aria-live="polite">
          <p className="text-sm text-slate-700">
            <span className="font-medium">Selected:</span> {selectedCrop.name} - 
            Cold Storage Loss: {(selectedCrop.spoilageRate.coldStorage * 100).toFixed(1)}%, 
            Solar Drying Loss: {(selectedCrop.spoilageRate.solarDrying * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default CropSelector;