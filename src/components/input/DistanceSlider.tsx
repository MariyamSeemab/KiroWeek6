import React, { useState } from 'react';

interface DistanceSliderProps {
  onDistanceChange: (distance: number) => void;
  initialDistance?: number;
}

const DistanceSlider: React.FC<DistanceSliderProps> = ({ 
  onDistanceChange, 
  initialDistance = 25 
}) => {
  const [distance, setDistance] = useState(initialDistance);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDistance = parseInt(event.target.value);
    setDistance(newDistance);
    onDistanceChange(newDistance);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-700">Distance to Cold Storage</h3>
      
      {/* Large Number Display */}
      <div className="text-center">
        <div className="text-4xl font-bold text-slate-800 mb-2">
          {distance} <span className="text-2xl text-slate-600">KM</span>
        </div>
        <p className="text-sm text-slate-600">
          Transport cost: ₹{(distance * 5).toLocaleString()}
        </p>
      </div>

      {/* Custom Range Slider */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max="200"
          step="5"
          value={distance}
          onChange={handleSliderChange}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${(distance / 200) * 100}%, #E2E8F0 ${(distance / 200) * 100}%, #E2E8F0 100%)`
          }}
        />
        
        {/* Slider Labels */}
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>0 KM</span>
          <span>50 KM</span>
          <span>100 KM</span>
          <span>150 KM</span>
          <span>200 KM</span>
        </div>
      </div>

      {/* Distance Categories */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className={`text-center p-2 rounded ${distance <= 25 ? 'bg-green-100 text-green-800' : 'text-slate-500'}`}>
          <div className="font-medium">Near</div>
          <div>0-25 KM</div>
        </div>
        <div className={`text-center p-2 rounded ${distance > 25 && distance <= 75 ? 'bg-yellow-100 text-yellow-800' : 'text-slate-500'}`}>
          <div className="font-medium">Medium</div>
          <div>26-75 KM</div>
        </div>
        <div className={`text-center p-2 rounded ${distance > 75 ? 'bg-red-100 text-red-800' : 'text-slate-500'}`}>
          <div className="font-medium">Far</div>
          <div>76+ KM</div>
        </div>
      </div>
    </div>
  );
};

export default DistanceSlider;