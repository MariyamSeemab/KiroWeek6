import { CropType, StorageOption, DecisionResult } from '../types/storage';
import { EnvironmentalData } from '../types/iot';
import { MarketData } from '../types/market';

export class CalculationEngine {
  // Calculate solar drying risk multiplier based on environmental conditions
  public calculateSolarRisk(humidity: number, temperature: number): number {
    let riskMultiplier = 1.0;
    
    // Humidity risk (primary factor)
    if (humidity > 80) {
      riskMultiplier *= 3.0; // Critical risk - 3x spoilage rate
    } else if (humidity > 65) {
      riskMultiplier *= 1.5; // Moderate risk - 1.5x spoilage rate
    }
    // If humidity <= 65%, no additional risk (multiplier stays 1.0)
    
    // Temperature risk (secondary factor)
    if (temperature > 35) {
      riskMultiplier *= 1.2; // High temperature increases spoilage
    } else if (temperature < 20) {
      riskMultiplier *= 1.1; // Low temperature slows drying, slight risk increase
    }
    
    return riskMultiplier;
  }

  // Calculate transport cost based on distance
  public calculateTransportCost(
    volume: number, 
    distance: number, 
    transportCostPerKm: number
  ): number {
    return volume * distance * transportCostPerKm;
  }

  // Calculate profit for a specific storage option
  public calculateProfit(
    crop: CropType,
    volume: number,
    distance: number,
    storageType: 'cold_storage' | 'solar_drying',
    environmentalRisk: number,
    marketData: MarketData
  ): number {
    const baseRevenue = crop.marketPrice * volume;
    const transportCost = this.calculateTransportCost(
      volume, 
      distance, 
      marketData.storage.transportCostPerKm
    );
    
    if (storageType === 'cold_storage') {
      const storageCost = volume * marketData.storage.coldStorageCost;
      const spoilage = baseRevenue * crop.spoilageRate.coldStorage;
      return baseRevenue - transportCost - storageCost - spoilage;
    } else {
      // Solar drying - no transport or storage costs, but higher spoilage risk
      const spoilage = baseRevenue * crop.spoilageRate.solarDrying * environmentalRisk;
      return baseRevenue - spoilage;
    }
  }

  // Calculate storage options comparison
  public calculateStorageOptions(
    crop: CropType,
    volume: number,
    distance: number,
    environmentalData: EnvironmentalData,
    marketData: MarketData
  ): { coldStorage: StorageOption; solarDrying: StorageOption } {
    const environmentalRisk = this.calculateSolarRisk(
      environmentalData.humidity,
      environmentalData.temperature
    );

    // Cold Storage Option
    const coldStorageProfit = this.calculateProfit(
      crop,
      volume,
      distance,
      'cold_storage',
      1.0, // No environmental risk for cold storage
      marketData
    );

    const coldStorage: StorageOption = {
      type: 'cold_storage',
      estimatedProfit: coldStorageProfit,
      riskPenalty: 0, // Cold storage has minimal risk
      carbonFootprint: 'high',
      costs: {
        storage: volume * marketData.storage.coldStorageCost,
        transport: this.calculateTransportCost(
          volume,
          distance,
          marketData.storage.transportCostPerKm
        ),
        energy: volume * 20 // Estimated energy cost for refrigeration
      }
    };

    // Solar Drying Option
    const solarDryingProfit = this.calculateProfit(
      crop,
      volume,
      distance,
      'solar_drying',
      environmentalRisk,
      marketData
    );

    // Calculate risk penalty as percentage loss due to environmental conditions
    const baseProfit = crop.marketPrice * volume - (crop.marketPrice * volume * crop.spoilageRate.solarDrying);
    const riskPenalty = ((baseProfit - solarDryingProfit) / baseProfit) * 100;

    const solarDrying: StorageOption = {
      type: 'solar_drying',
      estimatedProfit: solarDryingProfit,
      riskPenalty: Math.max(0, riskPenalty),
      carbonFootprint: 'zero',
      costs: {
        storage: 0, // No storage cost for on-farm drying
        transport: 0, // No transport needed
        energy: 0 // Solar energy is free
      }
    };

    return { coldStorage, solarDrying };
  }

  // Generate recommendation based on storage options
  public generateRecommendation(
    coldStorage: StorageOption,
    solarDrying: StorageOption,
    environmentalData: EnvironmentalData,
    distance: number,
    crop: CropType
  ): DecisionResult {
    // Determine recommended option based on profit
    const recommendedOption = coldStorage.estimatedProfit > solarDrying.estimatedProfit 
      ? coldStorage 
      : solarDrying;

    // Calculate confidence based on profit difference
    const profitDifference = Math.abs(coldStorage.estimatedProfit - solarDrying.estimatedProfit);
    const averageProfit = (coldStorage.estimatedProfit + solarDrying.estimatedProfit) / 2;
    const confidence = Math.min(95, Math.max(60, (profitDifference / averageProfit) * 100));

    // Generate explanation
    const explanation = this.generateExplanation(
      recommendedOption,
      coldStorage,
      solarDrying,
      environmentalData,
      distance
    );

    return {
      recommendedOption,
      explanation,
      confidence,
      factors: {
        humidity: environmentalData.humidity,
        distance,
        marketPrice: crop.marketPrice
      }
    };
  }

  // Generate detailed explanation for the recommendation
  private generateExplanation(
    recommended: StorageOption,
    coldStorage: StorageOption,
    solarDrying: StorageOption,
    environmentalData: EnvironmentalData,
    distance: number
  ): string {
    const profitDiff = Math.abs(coldStorage.estimatedProfit - solarDrying.estimatedProfit);
    const isCloseCall = profitDiff < 10000; // Within ₹10,000

    let explanation = `The Referee recommends ${
      recommended.type === 'cold_storage' ? 'Cold Storage' : 'Solar Drying'
    }`;

    if (recommended.type === 'cold_storage') {
      explanation += ` because `;
      
      if (environmentalData.humidity > 80) {
        explanation += `the current ${environmentalData.humidity.toFixed(1)}% humidity creates critical risk for solar drying, making it 3x more likely to result in fungal loss`;
      } else if (environmentalData.humidity > 65) {
        explanation += `the current ${environmentalData.humidity.toFixed(1)}% humidity increases solar drying risk by 50%`;
      } else if (distance > 50) {
        explanation += `despite high transport costs (₹${coldStorage.costs.transport.toLocaleString()}) due to ${distance}km distance, the guaranteed preservation outweighs the risk`;
      } else {
        explanation += `it provides better financial returns (₹${coldStorage.estimatedProfit.toLocaleString()}) with minimal spoilage risk`;
      }
      
      if (coldStorage.costs.transport > 20000) {
        explanation += `. However, transport costs are significant at ₹${coldStorage.costs.transport.toLocaleString()}`;
      }
    } else {
      explanation += ` because `;
      
      if (environmentalData.humidity <= 65) {
        explanation += `the current ${environmentalData.humidity.toFixed(1)}% humidity is ideal for solar drying with minimal spoilage risk`;
      } else {
        explanation += `despite ${environmentalData.humidity.toFixed(1)}% humidity risk, the zero transport and storage costs provide better returns`;
      }
      
      explanation += `. This saves ₹${coldStorage.costs.transport.toLocaleString()} in transport costs and ₹${coldStorage.costs.storage.toLocaleString()} in storage fees`;
      
      if (solarDrying.riskPenalty > 10) {
        explanation += `, though there's a ${solarDrying.riskPenalty.toFixed(1)}% risk penalty due to environmental conditions`;
      }
    }

    if (isCloseCall) {
      explanation += `. Note: This is a close decision with only ₹${profitDiff.toLocaleString()} difference - consider your risk tolerance`;
    }

    explanation += `.`;

    return explanation;
  }

  // Utility method to format currency
  public formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString()}`;
  }

  // Utility method to calculate ROI
  public calculateROI(profit: number, investment: number): number {
    if (investment === 0) return 0;
    return (profit / investment) * 100;
  }

  // Get risk level description
  public getRiskLevel(humidity: number): { level: string; color: string; description: string } {
    if (humidity <= 65) {
      return {
        level: 'Low',
        color: 'text-green-600',
        description: 'Ideal conditions for solar drying'
      };
    } else if (humidity <= 80) {
      return {
        level: 'Medium',
        color: 'text-yellow-600',
        description: 'Moderate risk - monitor conditions closely'
      };
    } else {
      return {
        level: 'High',
        color: 'text-red-600',
        description: 'Critical risk - solar drying not recommended'
      };
    }
  }
}

// Export singleton instance
export const calculationEngine = new CalculationEngine();
export default calculationEngine;