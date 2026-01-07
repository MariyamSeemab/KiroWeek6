import React from 'react';
import GaugeChart from 'react-gauge-chart';

interface HumidityGaugeProps {
  humidity: number;
  isLoading?: boolean;
}

const HumidityGauge: React.FC<HumidityGaugeProps> = ({ 
  humidity, 
  isLoading = false 
}) => {
  // Normalize humidity to 0-1 scale (0% to 100%)
  const normalizedValue = Math.max(0, Math.min(1, humidity / 100));

  // Determine color scheme based on humidity ranges
  const getHumidityStatus = (hum: number) => {
    if (hum <= 65) {
      return {
        status: 'Safe for Solar',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      };
    } else if (hum <= 80) {
      return {
        status: 'Caution',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      };
    } else {
      return {
        status: 'Critical Risk',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      };
    }
  };

  const status = getHumidityStatus(humidity);

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
          id="humidity-gauge"
          nrOfLevels={3}
          colors={['#10B981', '#F59E0B', '#EF4444']} // Green, Amber, Red
          arcsLength={[0.65, 0.15, 0.2]} // 0-65%, 66-80%, 81-100%
          arcWidth={0.3}
          percent={normalizedValue}
          textColor="#1F2937"
          needleColor="#374151"
          needleBaseColor="#6B7280"
          hideText={true}
          animate={true}
          animateDuration={1000}
        />
        
        {/* Center humidity display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mt-8">
            <div className="text-2xl font-bold text-slate-800">
              {humidity.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h4 className="font-semibold text-slate-700 mb-1">Humidity</h4>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.bgColor} ${status.color} ${status.borderColor} border`}>
          {status.status}
        </div>
      </div>

      {/* Humidity scale reference */}
      <div className="flex justify-between w-full text-xs text-slate-500 px-4">
        <span className="text-green-600">0%</span>
        <span className="text-yellow-600">65%</span>
        <span className="text-red-600">80%</span>
        <span>100%</span>
      </div>

      {/* Risk indicator */}
      <div className="w-full">
        <div className="text-xs text-slate-600 mb-1">Solar Drying Risk</div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              humidity <= 65 ? 'bg-green-500' :
              humidity <= 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(100, (humidity / 100) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HumidityGauge;