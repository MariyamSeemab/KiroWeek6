import React, { useState } from 'react';
import { EnvironmentalData } from '../../types/iot';

interface ManualEnvironmentalInputProps {
  onDataSubmit: (data: EnvironmentalData) => void;
  onRetryConnection: () => void;
}

export const ManualEnvironmentalInput: React.FC<ManualEnvironmentalInputProps> = ({
  onDataSubmit,
  onRetryConnection
}) => {
  const [temperature, setTemperature] = useState<string>('28');
  const [humidity, setHumidity] = useState<string>('70');
  const [errors, setErrors] = useState<{ temperature?: string; humidity?: string }>({});

  const validateInputs = () => {
    const newErrors: { temperature?: string; humidity?: string } = {};
    
    const tempValue = parseFloat(temperature);
    const humidityValue = parseFloat(humidity);
    
    if (isNaN(tempValue) || tempValue < -10 || tempValue > 60) {
      newErrors.temperature = 'Temperature must be between -10°C and 60°C';
    }
    
    if (isNaN(humidityValue) || humidityValue < 0 || humidityValue > 100) {
      newErrors.humidity = 'Humidity must be between 0% and 100%';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateInputs()) {
      const data: EnvironmentalData = {
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        timestamp: new Date(),
        sensorId: 'manual_input'
      };
      
      onDataSubmit(data);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Manual Environmental Input</h3>
        <button
          onClick={onRetryConnection}
          className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded transition-colors duration-200"
        >
          Retry Connection
        </button>
      </div>
      
      <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 mb-4">
        <div className="flex items-center text-amber-400 text-sm">
          <span className="mr-2">⚠️</span>
          IoT sensors are currently unavailable. Please enter environmental data manually.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="temperature" className="block text-slate-300 text-sm font-medium mb-2">
            Temperature (°C)
          </label>
          <input
            type="number"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            step="0.1"
            min="-10"
            max="60"
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              errors.temperature 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-slate-600 focus:border-yellow-500 focus:ring-yellow-500'
            }`}
            placeholder="Enter temperature"
          />
          {errors.temperature && (
            <p className="text-red-400 text-sm mt-1">{errors.temperature}</p>
          )}
        </div>

        <div>
          <label htmlFor="humidity" className="block text-slate-300 text-sm font-medium mb-2">
            Humidity (%)
          </label>
          <input
            type="number"
            id="humidity"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            step="0.1"
            min="0"
            max="100"
            className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors duration-200 ${
              errors.humidity 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-slate-600 focus:border-yellow-500 focus:ring-yellow-500'
            }`}
            placeholder="Enter humidity"
          />
          {errors.humidity && (
            <p className="text-red-400 text-sm mt-1">{errors.humidity}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors duration-200"
        >
          Update Environmental Data
        </button>
      </form>

      <div className="mt-4 text-slate-400 text-xs">
        <p>Current values: {temperature}°C, {humidity}%</p>
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default ManualEnvironmentalInput;