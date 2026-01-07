import React, { useState } from 'react';

interface VolumeInputProps {
  onVolumeChange: (volume: number) => void;
  initialVolume?: number;
}

const VolumeInput: React.FC<VolumeInputProps> = ({ 
  onVolumeChange, 
  initialVolume = 100 
}) => {
  const [volume, setVolume] = useState(initialVolume);
  const [error, setError] = useState<string>('');

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = parseFloat(value);

    // Reset error
    setError('');

    // Validation
    if (value === '') {
      setVolume(0);
      onVolumeChange(0);
      return;
    }

    if (isNaN(numericValue)) {
      setError('Please enter a valid number');
      return;
    }

    if (numericValue < 0) {
      setError('Volume cannot be negative');
      return;
    }

    if (numericValue > 10000) {
      setError('Volume cannot exceed 10,000 quintals');
      return;
    }

    setVolume(numericValue);
    onVolumeChange(numericValue);
  };

  const getVolumeCategory = (vol: number) => {
    if (vol === 0) return { label: 'No harvest', color: 'text-slate-500' };
    if (vol <= 50) return { label: 'Small scale', color: 'text-green-600' };
    if (vol <= 200) return { label: 'Medium scale', color: 'text-yellow-600' };
    if (vol <= 500) return { label: 'Large scale', color: 'text-orange-600' };
    return { label: 'Commercial scale', color: 'text-red-600' };
  };

  const category = getVolumeCategory(volume);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-700">Harvest Volume</h3>
      
      {/* Input Field */}
      <div className="relative">
        <input
          type="number"
          value={volume || ''}
          onChange={handleVolumeChange}
          placeholder="Enter volume"
          min="0"
          max="10000"
          step="0.1"
          className={`
            w-full px-4 py-3 pr-20 text-lg font-semibold rounded-lg border-2 
            transition-colors duration-200 focus:outline-none
            ${error 
              ? 'border-red-300 focus:border-red-500 bg-red-50' 
              : 'border-slate-200 focus:border-gold bg-white'
            }
          `}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
          Quintals
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Volume Information */}
      {!error && volume > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Scale:</span>
            <span className={`text-sm font-medium ${category.color}`}>
              {category.label}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-3 rounded">
              <div className="text-slate-600">Estimated Weight</div>
              <div className="font-semibold">{(volume * 100).toLocaleString()} kg</div>
            </div>
            <div className="bg-slate-50 p-3 rounded">
              <div className="text-slate-600">Storage Space Needed</div>
              <div className="font-semibold">{(volume * 1.2).toFixed(1)} m³</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Select Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {[50, 100, 250, 500].map((quickVolume) => (
          <button
            key={quickVolume}
            onClick={() => {
              setVolume(quickVolume);
              onVolumeChange(quickVolume);
              setError('');
            }}
            className="px-3 py-2 text-sm border border-slate-200 rounded hover:border-gold hover:bg-gold/5 transition-colors"
          >
            {quickVolume}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VolumeInput;