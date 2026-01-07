import React, { useState } from 'react';
import CropSelector from './CropSelector';
import DistanceSlider from './DistanceSlider';
import VolumeInput from './VolumeInput';
import { CropType } from '../../types/storage';

interface InputData {
  crop: CropType | null;
  distance: number;
  volume: number;
}

interface ContextualInputPanelProps {
  onInputChange: (data: InputData) => void;
}

const ContextualInputPanel: React.FC<ContextualInputPanelProps> = ({ onInputChange }) => {
  const [inputData, setInputData] = useState<InputData>({
    crop: null,
    distance: 25,
    volume: 100
  });

  const updateInputData = (updates: Partial<InputData>) => {
    const newData = { ...inputData, ...updates };
    setInputData(newData);
    onInputChange(newData);
  };

  const handleCropSelect = (crop: CropType) => {
    updateInputData({ crop });
  };

  const handleDistanceChange = (distance: number) => {
    updateInputData({ distance });
  };

  const handleVolumeChange = (volume: number) => {
    updateInputData({ volume });
  };

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Harvest Parameters
        </h2>
        <p className="text-slate-600">
          Define your crop details to get personalized storage recommendations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Crop Selection Box */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
          <CropSelector 
            onCropSelect={handleCropSelect}
            selectedCrop={inputData.crop}
          />
        </div>

        {/* Distance Slider Box */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
          <DistanceSlider 
            onDistanceChange={handleDistanceChange}
            initialDistance={inputData.distance}
          />
        </div>

        {/* Volume Input Box */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
          <VolumeInput 
            onVolumeChange={handleVolumeChange}
            initialVolume={inputData.volume}
          />
        </div>
      </div>

      {/* Summary Bar */}
      {inputData.crop && inputData.volume > 0 && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gold/10 border border-gold/20 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl">{inputData.crop.icon}</span>
                <span className="font-semibold text-slate-800">{inputData.crop.name}</span>
              </div>
              <div className="text-slate-600 text-sm sm:text-base">
                <span className="font-medium">{inputData.volume}</span> quintals
              </div>
              <div className="text-slate-600 text-sm sm:text-base">
                <span className="font-medium">{inputData.distance}</span> km to storage
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs sm:text-sm text-slate-600">Estimated Value</div>
              <div className="text-base sm:text-lg font-bold text-slate-800">
                ₹{(inputData.crop.marketPrice * inputData.volume).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContextualInputPanel;