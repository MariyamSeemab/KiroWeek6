import React from 'react';
import GaugeChart from 'react-gauge-chart';

interface TemperatureGaugeProps {
  temperature: number;
  isLoading?: boolean;
}

const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({ 
  temperature, 
  isLoading = false 
}) => {
  // Normalize temperature to 0-1 scale (0°C to 50°C)
  const normalizedValue = Math.max(0, Math.min(1, temperature / 50));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="w-48 h-24 bg-slate-200 rounded-full animate-pulse"></div>
        <div className="text-center">
          <div className="h-4 bg-slate-200 rounded w-20 animate-pulse mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <GaugeChart
          id="temperature-gauge"
          nrOfLevels={20}
          colors={['#3B82F6', '#60A5FA', '#FBBF24', '#F87171', '#EF4444']}
          arcWidth={0.3}
          percent={normalizedValue}
          textColor="#1F2937"
          needleColor="#374151"
          needleBaseColor="#6B7280"
          hideText={true}
          animate={true}
          animateDuration={1000}
        />
        
        {/* Center temperature display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mt-8">
            <div className="text-2xl font-bold text-slate-800">
              {temperature.toFixed(1)}°C
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h4 className="font-semibold text-slate-700 mb-1">Temperature</h4>
        <p className="text-sm text-slate-600">
          {temperature < 15 && 'Cool'}
          {temperature >= 15 && temperature < 25 && 'Moderate'}
          {temperature >= 25 && temperature < 35 && 'Warm'}
          {temperature >= 35 && 'Hot'}
        </p>
      </div>

      {/* Temperature scale reference */}
      <div className="flex justify-between w-full text-xs text-slate-500 px-4">
        <span>0°C</span>
        <span>25°C</span>
        <span>50°C</span>
      </div>
    </div>
  );
};

export default TemperatureGauge;