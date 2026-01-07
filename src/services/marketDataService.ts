import { MarketData, MarketDataState } from '../types/market';

class MarketDataService {
  private subscribers: ((state: MarketDataState) => void)[] = [];
  private currentState: MarketDataState = {
    data: null,
    loading: false,
    error: null
  };
  private retryCount = 0;
  private maxRetries = 3;
  private retryTimeoutId: NodeJS.Timeout | null = null;

  // Simulate market data (in real app, this would fetch from S3)
  private generateMockMarketData(): MarketData {
    return {
      crops: {
        wheat: {
          currentPrice: 2500 + Math.random() * 200 - 100, // ±100 variation
          priceHistory: [2400, 2450, 2500, 2520, 2480],
          spoilageRates: {
            coldStorage: 0.02,
            solarDrying: 0.08
          }
        },
        chili: {
          currentPrice: 8000 + Math.random() * 1000 - 500, // ±500 variation
          priceHistory: [7800, 7900, 8100, 8000, 7950],
          spoilageRates: {
            coldStorage: 0.03,
            solarDrying: 0.12
          }
        },
        tomato: {
          currentPrice: 3500 + Math.random() * 300 - 150, // ±150 variation
          priceHistory: [3400, 3450, 3500, 3550, 3480],
          spoilageRates: {
            coldStorage: 0.05,
            solarDrying: 0.15
          }
        }
      },
      storage: {
        coldStorageCost: 50, // ₹50 per quintal per month
        transportCostPerKm: 5 // ₹5 per quintal per km
      },
      lastUpdated: new Date().toISOString()
    };
  }

  // Simulate S3 fetch with realistic delays and potential failures
  private async simulateS3Fetch(): Promise<MarketData> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simulate occasional failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Failed to fetch market data from S3');
    }

    return this.generateMockMarketData();
  }

  // Fetch market data with retry logic
  public async fetchMarketData(): Promise<void> {
    this.updateState({
      ...this.currentState,
      loading: true,
      error: null
    });

    try {
      const data = await this.simulateS3Fetch();
      
      this.updateState({
        data,
        loading: false,
        error: null
      });
      
      this.retryCount = 0; // Reset retry count on success
    } catch (error) {
      await this.handleFetchError(error);
    }
  }

  private async handleFetchError(error: unknown): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      const retryDelay = 1000 * Math.pow(2, this.retryCount - 1); // Exponential backoff
      
      this.updateState({
        data: this.currentState.data, // Keep previous data if available
        loading: true,
        error: `${errorMessage} (retrying in ${retryDelay / 1000}s... attempt ${this.retryCount}/${this.maxRetries})`
      });

      this.retryTimeoutId = setTimeout(async () => {
        try {
          const data = await this.simulateS3Fetch();
          
          this.updateState({
            data,
            loading: false,
            error: null
          });
          
          this.retryCount = 0;
        } catch (retryError) {
          await this.handleFetchError(retryError);
        }
      }, retryDelay);
    } else {
      this.updateState({
        data: this.currentState.data, // Keep previous data if available
        loading: false,
        error: `${errorMessage}. Max retries reached. Please try again later.`
      });
      this.retryCount = 0;
    }
  }

  // Manual retry method
  public async retry(): Promise<void> {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
      this.retryTimeoutId = null;
    }
    this.retryCount = 0;
    await this.fetchMarketData();
  }

  // Get current market data state
  public getCurrentState(): MarketDataState {
    return { ...this.currentState };
  }

  // Subscribe to market data updates
  public subscribe(callback: (state: MarketDataState) => void): () => void {
    this.subscribers.push(callback);
    
    // Immediately call with current state
    callback(this.currentState);
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  // Get specific crop data with null safety
  public getCropData(cropId: string): MarketData['crops'][string] | null {
    return this.currentState.data?.crops?.[cropId] || null;
  }

  // Get storage costs with null safety
  public getStorageCosts(): MarketData['storage'] | null {
    return this.currentState.data?.storage || null;
  }

  // Refresh market data (for manual refresh)
  public async refreshData(): Promise<void> {
    await this.fetchMarketData();
  }

  // Start automatic data refresh
  public startAutoRefresh(intervalMs: number = 300000): () => void { // Default 5 minutes
    const intervalId = setInterval(() => {
      this.fetchMarketData();
    }, intervalMs);

    // Return stop function
    return () => {
      clearInterval(intervalId);
    };
  }

  private updateState(newState: MarketDataState): void {
    this.currentState = newState;
    this.subscribers.forEach(callback => callback(newState));
  }

  // Utility method to check if data is stale
  public isDataStale(maxAgeMs: number = 600000): boolean { // Default 10 minutes
    if (!this.currentState.data?.lastUpdated) return true;
    
    const lastUpdate = new Date(this.currentState.data.lastUpdated);
    const now = new Date();
    return (now.getTime() - lastUpdate.getTime()) > maxAgeMs;
  }

  // Get formatted price with currency
  public getFormattedPrice(cropId: string): string {
    const cropData = this.getCropData(cropId);
    if (!cropData) return 'Price unavailable';
    
    return `₹${cropData.currentPrice.toLocaleString()}/quintal`;
  }

  // Calculate price trend
  public getPriceTrend(cropId: string): 'up' | 'down' | 'stable' | 'unknown' {
    const cropData = this.getCropData(cropId);
    if (!cropData?.priceHistory || cropData.priceHistory.length < 2) return 'unknown';
    
    const recent = cropData.priceHistory.slice(-2);
    const change = recent[1] - recent[0];
    
    if (Math.abs(change) < cropData.currentPrice * 0.01) return 'stable'; // Less than 1% change
    return change > 0 ? 'up' : 'down';
  }
}

// Export singleton instance
export const marketDataService = new MarketDataService();
export default marketDataService;