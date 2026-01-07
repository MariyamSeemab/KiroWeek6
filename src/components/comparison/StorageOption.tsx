import React from 'react';
import { StorageOption as StorageOptionType } from '../../types/storage';

interface StorageOptionProps {
  option: StorageOptionType;
  isRecommended?: boolean;
  isLoading?: boolean;
}

const StorageOption: React.FC<StorageOptionProps> = ({ 
  option, 
  isRecommended = false,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-slate-200 animate-pulse">
        <div className="h-6 bg-slate-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const getOptionIcon = () => {
    return option.type === 'cold_storage' ? '🏭' : '☀️';
  };

  const getOptionTitle = () => {
    return option.type === 'cold_storage' ? 'Cold Storage' : 'Solar Drying';
  };

  const getCarbonFootprintColor = () => {
    return option.carbonFootprint === 'high' ? 'text-red-600' : 'text-green-600';
  };

  const getCarbonFootprintBg = () => {
    return option.carbonFootprint === 'high' ? 'bg-red-50' : 'bg-green-50';
  };

  return (
    <div className={`
      bg-white p-6 rounded-lg border-2 transition-all duration-200
      ${isRecommended 
        ? 'border-gold bg-gold/5 shadow-lg' 
        : 'border-slate-200 hover:border-slate-300'
      }
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getOptionIcon()}</span>
          <h4 className="text-lg font-semibold text-slate-800">
            {getOptionTitle()}
          </h4>
        </div>
        {isRecommended && (
          <div className="flex items-center space-x-1 text-gold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Recommended</span>
          </div>
        )}
      </div>

      {/* Estimated Profit */}
      <div className="mb-4">
        <div className="text-sm text-slate-600 mb-1">Estimated Profit</div>
        <div className="text-2xl font-bold text-slate-800">
          ₹{option.estimatedProfit.toLocaleString()}
        </div>
      </div>

      {/* Risk Penalty (only for solar drying) */}
      {option.type === 'solar_drying' && option.riskPenalty > 0 && (
        <div className="mb-4">
          <div className="text-sm text-slate-600 mb-1">Risk Penalty</div>
          <div className="text-lg font-semibold text-red-600">
            -{option.riskPenalty.toFixed(1)}%
          </div>
          <div className="text-xs text-slate-500">
            Due to environmental conditions
          </div>
        </div>
      )}

      {/* Carbon Footprint */}
      <div className="mb-4">
        <div className="text-sm text-slate-600 mb-1">Carbon Footprint</div>
        <div className={`
          inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
          ${getCarbonFootprintBg()} ${getCarbonFootprintColor()}
        `}>
          {option.carbonFootprint === 'high' ? '🏭 High' : '🌱 Zero'}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-slate-700 mb-2">Cost Breakdown</div>
        
        {option.costs.storage > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Storage Cost:</span>
            <span className="font-medium">₹{option.costs.storage.toLocaleString()}</span>
          </div>
        )}
        
        {option.costs.transport > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Transport Cost:</span>
            <span className="font-medium">₹{option.costs.transport.toLocaleString()}</span>
          </div>
        )}
        
        {option.costs.energy > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Energy Cost:</span>
            <span className="font-medium">₹{option.costs.energy.toLocaleString()}</span>
          </div>
        )}

        {/* Total Costs */}
        <div className="border-t border-slate-200 pt-2 mt-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-slate-700">Total Costs:</span>
            <span className="text-slate-800">
              ₹{(option.costs.storage + option.costs.transport + option.costs.energy).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Zero cost message for solar drying */}
        {option.type === 'solar_drying' && 
         option.costs.storage === 0 && 
         option.costs.transport === 0 && 
         option.costs.energy === 0 && (
          <div className="text-center py-2">
            <div className="text-green-600 font-medium text-sm">
              ✨ Zero operational costs
            </div>
            <div className="text-xs text-slate-500">
              On-farm solar drying
            </div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
          <div>
            <div className="font-medium">Processing Time</div>
            <div>{option.type === 'cold_storage' ? '1-2 days' : '5-7 days'}</div>
          </div>
          <div>
            <div className="font-medium">Shelf Life</div>
            <div>{option.type === 'cold_storage' ? '6-12 months' : '3-6 months'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageOption;