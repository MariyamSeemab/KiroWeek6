# Design Document: Smart-Silo Storage Referee

## Overview

The Smart-Silo Storage Referee is a React-based web application that provides real-time decision support for Indian farmers choosing between Industrial Cold Storage and On-Farm Solar Drying options. The system combines IoT environmental data, market pricing information, and risk analysis to deliver actionable recommendations that minimize post-harvest losses and maximize profitability.

The application follows a modern, professional design with a collapsible sidebar navigation and responsive dashboard layout. It integrates real-time data streams from AWS IoT Core for environmental monitoring and fetches market data from S3 storage for financial calculations.

## Architecture

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design and animations
- **State Management**: React Context API with useReducer for complex state
- **Charts**: react-gauge-chart for speedometer visualizations
- **Real-time Data**: AWS IoT Core with MQTT over WebSocket
- **Data Storage**: AWS S3 for market data and historical information
- **Build Tool**: Vite for fast development and optimized builds

### Application Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── MainLayout.tsx
│   │   └── MobileHeader.tsx
│   ├── input/
│   │   ├── CropSelector.tsx
│   │   ├── DistanceSlider.tsx
│   │   └── VolumeInput.tsx
│   ├── charts/
│   │   ├── TemperatureGauge.tsx
│   │   ├── HumidityGauge.tsx
│   │   └── GaugeContainer.tsx
│   ├── comparison/
│   │   ├── ComparisonMatrix.tsx
│   │   ├── StorageOption.tsx
│   │   └── VerdictCard.tsx
│   └── common/
│       ├── SkeletonLoader.tsx
│       └── ErrorBoundary.tsx
├── hooks/
│   ├── useIoTData.ts
│   ├── useMarketData.ts
│   └── useSidebarState.ts
├── services/
│   ├── iotService.ts
│   ├── marketDataService.ts
│   └── calculationEngine.ts
├── types/
│   ├── storage.ts
│   ├── iot.ts
│   └── market.ts
└── utils/
    ├── calculations.ts
    └── formatters.ts
```

## Components and Interfaces

### Core Data Types

```typescript
interface CropType {
  id: string;
  name: string;
  icon: string;
  marketPrice: number;
  spoilageRate: {
    coldStorage: number;
    solarDrying: number;
  };
}

interface EnvironmentalData {
  temperature: number;
  humidity: number;
  timestamp: Date;
  sensorId: string;
}

interface StorageOption {
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

interface DecisionResult {
  recommendedOption: StorageOption;
  explanation: string;
  confidence: number;
  factors: {
    humidity: number;
    distance: number;
    marketPrice: number;
  };
}
```

### Layout Components

#### Sidebar Component
The sidebar implements a collapsible navigation with smooth animations:
- **Expanded State**: 260px width with full navigation labels
- **Collapsed State**: 80px width with icon-only navigation
- **Animation**: Uses Tailwind's `transition-all duration-300` for smooth width changes
- **Toggle**: ChevronLeft/ChevronRight icon positioned at top-right
- **Styling**: Deep Navy (#0F172A) background with 1px gold (#F59E0B) right border

```typescript
interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}
```

#### MainLayout Component
Implements the reflow behavior where main content adjusts to sidebar state:
- Uses CSS Grid or Flexbox for responsive layout
- Main content area uses `margin-left` transition to match sidebar animation
- Ensures content never overlaps with sidebar in any state

### Input Components

#### CropSelector Component
Displays selectable crop cards with visual feedback:
- **Layout**: Grid of icon cards (wheat, chili, tomato)
- **Interaction**: Click to select with gold glow effect (`ring-2 ring-yellow-400`)
- **Icons**: Custom SVG icons with gold stroke color
- **State**: Manages selected crop and triggers price updates

#### DistanceSlider Component
Custom range slider for transport distance:
- **Display**: Large number showing current value (e.g., "45 KM")
- **Slider**: Custom Tailwind styling with gold thumb and dark track
- **Range**: 0-200 KM with appropriate step increments
- **Callback**: Updates transport cost calculations in real-time

#### VolumeInput Component
Harvest volume input with validation:
- **Input**: Number input with "Quintals" suffix
- **Validation**: Positive numbers only, reasonable maximum limits
- **Styling**: Gold border on focus state
- **Integration**: Feeds into profit calculations

### IoT Data Visualization

#### Environmental Gauges
Two circular speedometer gauges for temperature and humidity:

**TemperatureGauge**:
- Range: 0-50°C
- Color gradient: Blue (#3B82F6) to Red (#EF4444)
- Needle animation with smooth transitions
- Real-time updates from IoT stream

**HumidityGauge**:
- Range: 0-100%
- Semantic color zones:
  - Green (0-65%): Safe for solar drying
  - Amber (66-80%): Caution zone
  - Red (81%+): Critical risk
- Risk indicator affects solar drying penalty calculation

```typescript
interface GaugeProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  colorScheme: 'temperature' | 'humidity';
  isLoading?: boolean;
}
```

### Comparison and Decision Components

#### ComparisonMatrix Component
Side-by-side comparison of storage options:
- **Layout**: Two columns with "vs" divider
- **Metrics**: Estimated profit, risk penalty, carbon footprint
- **Styling**: Clean cards with clear typography hierarchy
- **Updates**: Real-time recalculation based on input changes

#### VerdictCard Component
Final recommendation display:
- **Layout**: Full-width footer card with 4px gold left border
- **Content**: Dynamic explanation string with specific reasoning
- **Action**: "Download Decision Report" button
- **Logic**: Updates automatically when inputs or environmental data changes

## Data Models

### Market Data Structure
Market data stored in S3 with the following schema:
```json
{
  "crops": {
    "wheat": {
      "currentPrice": 2500,
      "priceHistory": [...],
      "spoilageRates": {
        "coldStorage": 0.02,
        "solarDrying": 0.08
      }
    }
  },
  "storage": {
    "coldStorageCost": 50,
    "transportCostPerKm": 5
  },
  "lastUpdated": "2024-01-06T10:00:00Z"
}
```

### IoT Data Stream
Environmental data from AWS IoT Core:
```json
{
  "sensorId": "farm_001_env",
  "timestamp": "2024-01-06T10:30:00Z",
  "temperature": 28.5,
  "humidity": 72.3,
  "location": {
    "lat": 28.6139,
    "lng": 77.2090
  }
}
```

### Calculation Engine

#### Risk Assessment Algorithm
The system calculates storage risk based on environmental conditions:

```typescript
function calculateSolarRisk(humidity: number, temperature: number): number {
  let riskMultiplier = 1.0;
  
  // Humidity risk (primary factor)
  if (humidity > 80) {
    riskMultiplier *= 3.0; // Critical risk
  } else if (humidity > 65) {
    riskMultiplier *= 1.5; // Moderate risk
  }
  
  // Temperature risk (secondary factor)
  if (temperature > 35) {
    riskMultiplier *= 1.2;
  }
  
  return riskMultiplier;
}
```

#### Profit Calculation
Financial analysis considering all cost factors:

```typescript
function calculateProfit(
  crop: CropType,
  volume: number,
  distance: number,
  storageType: 'cold' | 'solar',
  environmentalRisk: number
): number {
  const baseRevenue = crop.marketPrice * volume;
  const transportCost = distance * TRANSPORT_COST_PER_KM;
  
  if (storageType === 'cold') {
    const storageCost = volume * COLD_STORAGE_COST_PER_QUINTAL;
    const spoilage = baseRevenue * crop.spoilageRate.coldStorage;
    return baseRevenue - transportCost - storageCost - spoilage;
  } else {
    const spoilage = baseRevenue * crop.spoilageRate.solarDrying * environmentalRisk;
    return baseRevenue - spoilage; // No transport or storage costs
  }
}
```

## Error Handling

### Data Loading States
- **Skeleton Loaders**: Display animated placeholders during data fetching
- **Optional Chaining**: Use `data?.crop?.price` pattern throughout
- **Null Checks**: Initialize all market data as null, handle gracefully

### IoT Connectivity Issues
- **Fallback Mode**: Switch to manual environmental input when IoT unavailable
- **Connection Monitoring**: Display connection status indicator
- **Retry Logic**: Automatic reconnection attempts with exponential backoff

### Error Boundaries
React Error Boundaries wrap major components to prevent crashes:
- **Component-Level**: Individual error boundaries for each major section
- **Fallback UI**: User-friendly error messages with retry options
- **Logging**: Error reporting for debugging and monitoring

## Testing Strategy

The application will use a dual testing approach combining unit tests and property-based tests to ensure comprehensive coverage and correctness.

### Property-Based Testing Framework
We will use **fast-check** library for property-based testing in TypeScript/React applications. Fast-check provides excellent TypeScript support and integrates well with Jest.

**Configuration**: Each property test will run a minimum of 100 iterations to ensure thorough input coverage.

### Unit Testing Approach
Unit tests will focus on:
- **Component Rendering**: Verify components render correctly with various props
- **User Interactions**: Test click handlers, form submissions, and state changes  
- **Edge Cases**: Empty data, network failures, invalid inputs
- **Integration Points**: Component communication and data flow

### Property-Based Testing Approach  
Property tests will verify universal behaviors across all valid inputs:
- **Calculation Correctness**: Financial calculations maintain mathematical properties
- **UI State Consistency**: Component states remain valid across all input combinations
- **Data Transformation**: Serialization and parsing operations preserve data integrity

**Test Tagging**: Each property test will include a comment tag referencing the design document property:
```typescript
// Feature: smart-silo-storage-referee, Property 1: Profit calculation consistency
```

Both testing approaches are complementary - unit tests catch specific bugs and regressions, while property tests verify the system behaves correctly across the entire input space.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the requirements analysis, the following correctness properties ensure the Smart-Silo Storage Referee operates correctly across all valid inputs and conditions:

### Property 1: Sidebar Content Reflow
*For any* sidebar state change (expanded/collapsed), the main content area should adjust its layout dimensions to accommodate the new sidebar width without overlapping content.
**Validates: Requirements 1.3**

### Property 2: Crop Selection Visual Feedback  
*For any* crop card selection, clicking the card should apply visual selection styling (gold glow) and deselect any previously selected card.
**Validates: Requirements 2.3**

### Property 3: Distance Slider Synchronization
*For any* slider position change, the displayed distance value should update to match the slider position in real-time.
**Validates: Requirements 2.4**

### Property 4: Humidity-Based Color Mapping
*For any* humidity value, the humidity gauge should display the correct semantic color: green (0-65%), amber (66-80%), or red (81%+).
**Validates: Requirements 3.3, 3.4, 3.5**

### Property 5: IoT Data Stream Processing
*For any* simulated IoT data update, the environmental gauges should reflect the new temperature and humidity values within the expected update interval.
**Validates: Requirements 3.6**

### Property 6: Market Data Integration
*For any* market data fetch operation, the system should handle the response appropriately, updating calculations when data is available or maintaining loading states when data is pending.
**Validates: Requirements 4.5**

### Property 7: Humidity Risk Penalty Calculation
*For any* humidity level above baseline, the solar drying risk penalty should increase proportionally, with higher humidity values resulting in higher penalties.
**Validates: Requirements 5.1**

### Property 8: Transport Cost Scaling
*For any* distance value, the transport cost for cold storage should scale linearly with distance, affecting the total cost calculation.
**Validates: Requirements 5.2**

### Property 9: Profit Calculation Consistency
*For any* valid combination of crop type, volume, distance, and environmental conditions, the profit calculations should be mathematically consistent and produce reasonable results within expected ranges.
**Validates: Requirements 5.3**

### Property 10: Carbon Footprint Assignment
*For any* storage option comparison, cold storage should always show "High" carbon footprint while solar drying should show "Zero" carbon footprint.
**Validates: Requirements 5.4**

### Property 11: Recommendation Logic Consistency
*For any* set of input parameters and environmental conditions, the recommendation algorithm should consistently choose the option with better financial outcomes adjusted for risk factors.
**Validates: Requirements 5.5**

### Property 12: Comprehensive Explanation Generation
*For any* recommendation generated, the explanation should include specific details about humidity impact, transport costs, and risk factors that influenced the decision.
**Validates: Requirements 6.2, 6.3**

### Property 13: Real-time Recommendation Updates
*For any* change in input parameters or environmental conditions, the recommendation and explanation should update automatically to reflect the new optimal choice.
**Validates: Requirements 6.5**

### Property 14: Responsive Layout Adaptation
*For any* screen size change or viewport resize, the grid layouts should adapt appropriately to maintain usability across different device sizes.
**Validates: Requirements 8.3**