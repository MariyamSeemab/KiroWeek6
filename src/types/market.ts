export interface MarketData {
  crops: {
    [key: string]: {
      currentPrice: number;
      priceHistory: number[];
      spoilageRates: {
        coldStorage: number;
        solarDrying: number;
      };
    };
  };
  storage: {
    coldStorageCost: number;
    transportCostPerKm: number;
  };
  lastUpdated: string;
}

export interface MarketDataState {
  data: MarketData | null;
  loading: boolean;
  error: string | null;
}