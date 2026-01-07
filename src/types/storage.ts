export interface CropType {
  id: string;
  name: string;
  icon: string;
  marketPrice: number;
  spoilageRate: {
    coldStorage: number;
    solarDrying: number;
  };
}

export interface StorageOption {
  type: 'cold_storage' | 'solar_drying';
  estimatedProfit: number;
  riskPenalty: number;
  carbonFootprint: 'high' | 'zero';
  costs: {
    storage: number;
    transport: number;
    energy: number;
  };
}

export interface DecisionResult {
  recommendedOption: StorageOption;
  explanation: string;
  confidence: number;
  factors: {
    humidity: number;
    distance: number;
    marketPrice: number;
  };
}