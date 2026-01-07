import React, { useState, useEffect } from 'react';
import StorageOption from './StorageOption';
import { StorageOption as StorageOptionType, CropType, DecisionResult } from '../../types/storage';
import { EnvironmentalData } from '../../types/iot';
import { MarketDataState } from '../../types/market';
import marketDataService from '../../services/marketDataService';
import calculationEngine from '../../services/calculationEngine';

interface ComparisonMatrixProps {
  crop: CropType | null;
  volume: number;
  distance: number;
  environmentalData: EnvironmentalData;
  onDecisionChange?: (decision: DecisionResult | null) => void;
}

const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  crop,
  volume,
  distance,
  environmentalData,
  onDecisionChange
}) => {
  const [marketDataState, setMarketDataState] = useState<MarketDataState>({
    data: null,
    loading: true,
    error: null
  });
  const [storageOptions, setStorageOptions] = useState<{
    coldStorage: StorageOptionType | null;
    solarDrying: StorageOptionType | null;
  }>({
    coldStorage: null,
    solarDrying: null
  });
  const [decision, setDecision] = useState<DecisionResult | null>(null);

  // Subscribe to market data
  useEffect(() => {
    const unsubscribe = marketDataService.subscribe(setMarketDataState);
    
    // Initial fetch
    marketDataService.fetchMarketData();
    
    return unsubscribe;
  }, []);

  // Recalculate when inputs change
  useEffect(() => {
    if (!crop || !marketDataState.data || volume <= 0) {
      setStorageOptions({ coldStorage: null, solarDrying: null });
      setDecision(null);
      onDecisionChange?.(null);
      return;
    }

    try {
      // Calculate storage options
      const options = calculationEngine.calculateStorageOptions(
        crop,
        volume,
        distance,
        environmentalData,
        marketDataState.data
      );

      setStorageOptions(options);

      // Generate recommendation
      const newDecision = calculationEngine.generateRecommendation(
        options.coldStorage,
        options.solarDrying,
        environmentalData,
        distance,
        crop
      );

      setDecision(newDecision);
      onDecisionChange?.(newDecision);
    } catch (error) {
      console.error('Calculation error:', error);
      setStorageOptions({ coldStorage: null, solarDrying: null });
      setDecision(null);
      onDecisionChange?.(null);
    }
  }, [crop, volume, distance, environmentalData, marketDataState.data, onDecisionChange]);

  const handleRefreshData = () => {
    marketDataService.refreshData();
  };

  // Show loading state
  if (marketDataState.loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-700">
            Storage Options Comparison
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600">Loading market data...</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StorageOption 
            option={{} as StorageOptionType} 
            isLoading={true}
          />
          <StorageOption 
            option={{} as StorageOptionType} 
            isLoading={true}
          />
        </div>
      </div>
    );
  }

  // Show error state
  if (marketDataState.error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">
          Storage Options Comparison
        </h3>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="text-red-600 mr-2">⚠️</div>
            <h4 className="font-semibold text-red-800">Market Data Error</h4>
          </div>
          <p className="text-sm text-red-700 mb-3">
            {marketDataState.error}
          </p>
          <button
            onClick={handleRefreshData}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Retry Loading Data
          </button>
        </div>
      </div>
    );
  }

  // Show incomplete input state
  if (!crop || volume <= 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">
          Storage Options Comparison
        </h3>
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
          <div className="text-slate-400 text-4xl mb-4">📊</div>
          <h4 className="font-semibold text-slate-600 mb-2">
            Complete Your Input
          </h4>
          <p className="text-sm text-slate-500">
            Select a crop and enter harvest volume to see storage options comparison
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-700">
          Storage Options Comparison
        </h3>
        <div className="flex items-center space-x-3">
          {/* Market data status */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Market data updated</span>
          </div>
          
          {/* Refresh button */}
          <button
            onClick={handleRefreshData}
            className="text-sm text-gold hover:text-yellow-600 underline"
            title="Refresh market data"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cold Storage Option */}
        {storageOptions.coldStorage && (
          <StorageOption
            option={storageOptions.coldStorage}
            isRecommended={decision?.recommendedOption.type === 'cold_storage'}
          />
        )}

        {/* Solar Drying Option */}
        {storageOptions.solarDrying && (
          <StorageOption
            option={storageOptions.solarDrying}
            isRecommended={decision?.recommendedOption.type === 'solar_drying'}
          />
        )}
      </div>

      {/* Quick Comparison Summary */}
      {storageOptions.coldStorage && storageOptions.solarDrying && (
        <div className="bg-slate-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-slate-700 mb-3">Quick Comparison</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-slate-600 mb-1">Profit Difference</div>
              <div className="font-semibold">
                ₹{Math.abs(storageOptions.coldStorage.estimatedProfit - storageOptions.solarDrying.estimatedProfit).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-slate-600 mb-1">Environmental Risk</div>
              <div className="font-semibold">
                {calculationEngine.getRiskLevel(environmentalData.humidity).level}
              </div>
            </div>
            <div>
              <div className="text-slate-600 mb-1">Transport Savings (Solar)</div>
              <div className="font-semibold text-green-600">
                ₹{storageOptions.coldStorage.costs.transport.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data freshness indicator */}
      <div className="text-xs text-slate-500 text-center">
        Market data last updated: {marketDataState.data?.lastUpdated ? 
          new Date(marketDataState.data.lastUpdated).toLocaleString() : 'Unknown'}
      </div>
    </div>
  );
};

export default ComparisonMatrix;