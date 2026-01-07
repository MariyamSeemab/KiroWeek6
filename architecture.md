# Architecture Documentation

## System Overview

The Smart Silo Storage Referee is a modern web application built with React and TypeScript that provides intelligent storage recommendations for Indian farmers. The system integrates real-time IoT data, market information, and sophisticated decision algorithms to minimize post-harvest losses.

## Architecture Principles

- **Component-Based Design**: Modular React components with clear separation of concerns
- **Type Safety**: Full TypeScript implementation for robust development
- **Real-time Data**: Live environmental monitoring through AWS IoT Core
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized builds with Vite and lazy loading
- **Scalability**: Cloud-native architecture with AWS services

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Application                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   React UI      │  │  State Mgmt     │  │   Services   │ │
│  │  Components     │  │   (Context)     │  │   Layer      │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cloud Services                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   AWS IoT Core  │  │      AWS S3     │  │   Vercel     │ │
│  │  (Sensor Data)  │  │  (Market Data)  │  │  (Hosting)   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Layout Layer

```
MainLayout
├── Sidebar (Collapsible Navigation)
│   ├── Navigation Items
│   └── Toggle Button
└── Main Content Area
    ├── Contextual Input Panel
    ├── IoT Environmental Hub
    ├── Comparison Matrix
    └── Verdict Card
```

### Component Hierarchy

```typescript
App
└── MainLayout
    ├── Sidebar
    │   └── Navigation Items
    └── Main Content
        ├── ContextualInputPanel
        │   ├── CropSelector
        │   ├── DistanceSlider
        │   └── VolumeInput
        ├── GaugeContainer
        │   ├── TemperatureGauge
        │   └── HumidityGauge
        ├── ComparisonMatrix
        │   ├── StorageOption (Cold Storage)
        │   └── StorageOption (Solar Drying)
        └── VerdictCard
```

## Data Flow Architecture

### State Management

The application uses React Context API with useReducer for complex state management:

```typescript
interface AppState {
  // Input Parameters
  selectedCrop: CropType | null;
  harvestVolume: number;
  distanceToStorage: number;
  
  // Environmental Data
  currentTemperature: number;
  currentHumidity: number;
  
  // Market Data
  marketPrices: MarketData | null;
  
  // UI State
  sidebarExpanded: boolean;
  isLoading: boolean;
}
```

### Data Sources

1. **User Input**: Crop selection, volume, distance
2. **IoT Sensors**: Real-time temperature and humidity
3. **Market Data**: S3-stored pricing and cost information
4. **Calculated Results**: Decision engine outputs

### Data Flow Diagram

```
User Input ──┐
             ├──► State Management ──► Decision Engine ──► UI Updates
IoT Data ────┤
             │
Market Data ─┘
```

## Service Layer Architecture

### IoT Service (`iotService.ts`)

Handles real-time environmental data from AWS IoT Core:

```typescript
class IoTService {
  private mqttClient: MqttClient;
  
  // Connect to AWS IoT Core
  connect(): Promise<void>
  
  // Subscribe to sensor data topics
  subscribeToSensorData(callback: (data: EnvironmentalData) => void): void
  
  // Handle connection failures and reconnection
  handleConnectionError(): void
}
```

**Features:**
- WebSocket-based MQTT connection
- Automatic reconnection with exponential backoff
- Real-time data streaming
- Connection status monitoring

### Market Data Service (`marketDataService.ts`)

Fetches pricing and cost data from AWS S3:

```typescript
class MarketDataService {
  // Fetch current market prices
  async getMarketPrices(): Promise<MarketData>
  
  // Get storage costs and rates
  async getStorageCosts(): Promise<StorageCosts>
  
  // Cache management for performance
  private cacheData(key: string, data: any): void
}
```

**Features:**
- S3 integration for data storage
- Caching layer for performance
- Error handling and fallbacks
- Data validation and transformation

### Calculation Engine (`calculationEngine.ts`)

Core decision logic and financial calculations:

```typescript
class CalculationEngine {
  // Calculate storage option profitability
  calculateProfits(params: CalculationParams): StorageComparison
  
  // Assess environmental risk factors
  assessEnvironmentalRisk(temp: number, humidity: number): RiskAssessment
  
  // Generate recommendation with reasoning
  generateRecommendation(comparison: StorageComparison): DecisionResult
}
```

**Algorithms:**
- Risk-adjusted profit calculations
- Environmental impact assessment
- Transport cost optimization
- Spoilage rate modeling

## UI/UX Architecture

### Design System

**Color Palette:**
- Primary: Deep Navy (#0F172A)
- Accent: Gold (#F59E0B)
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Danger: Red (#EF4444)

**Typography:**
- Headings: Inter font family
- Body: System font stack
- Monospace: Fira Code for data display

**Spacing:**
- Base unit: 4px (Tailwind's spacing scale)
- Component padding: 16px-24px
- Section margins: 32px-48px

### Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Layout Strategy:**
- Mobile-first approach
- Flexible grid systems
- Collapsible navigation
- Touch-friendly interactions

### Animation System

**Transitions:**
- Sidebar: 300ms ease-in-out
- Gauge updates: 500ms ease-out
- Card hover: 150ms ease-in-out
- Loading states: Pulse animation

## Performance Architecture

### Optimization Strategies

1. **Code Splitting**: Dynamic imports for large components
2. **Lazy Loading**: Defer non-critical component loading
3. **Memoization**: React.memo for expensive components
4. **Caching**: Service worker for static assets
5. **Bundle Optimization**: Vite's tree-shaking and minification

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## Security Architecture

### Data Protection

1. **Environment Variables**: Sensitive credentials in Vercel environment
2. **HTTPS Only**: All communications encrypted
3. **CORS Configuration**: Restricted cross-origin requests
4. **Input Validation**: Client and server-side validation
5. **Error Handling**: No sensitive data in error messages

### AWS Security

1. **IAM Roles**: Least privilege access policies
2. **IoT Policies**: Device-specific permissions
3. **S3 Bucket Policies**: Read-only public access for market data
4. **VPC Configuration**: Network isolation where applicable

## Deployment Architecture

### Vercel Configuration

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Build Process

1. **TypeScript Compilation**: Type checking and transpilation
2. **Asset Optimization**: Image compression and minification
3. **Bundle Generation**: Vite production build
4. **Static Generation**: Pre-rendered HTML for SEO
5. **CDN Distribution**: Global edge deployment

### Environment Configuration

**Development:**
- Local development server
- Mock IoT data
- Development AWS resources

**Production:**
- Vercel hosting
- Production AWS services
- Performance monitoring
- Error tracking

## Monitoring and Observability

### Application Monitoring

1. **Error Tracking**: React Error Boundaries
2. **Performance Metrics**: Web Vitals monitoring
3. **User Analytics**: Usage patterns and interactions
4. **Real-time Monitoring**: IoT connection status

### AWS Monitoring

1. **IoT Core Metrics**: Message throughput and errors
2. **S3 Access Logs**: Data fetch patterns
3. **CloudWatch Alarms**: Service health monitoring
4. **Cost Monitoring**: Resource usage tracking

## Scalability Considerations

### Horizontal Scaling

- **CDN Distribution**: Global content delivery
- **API Rate Limiting**: Prevent service overload
- **Caching Layers**: Reduce backend load
- **Load Balancing**: Distribute traffic efficiently

### Vertical Scaling

- **Component Optimization**: Reduce render cycles
- **Memory Management**: Efficient data structures
- **Bundle Size**: Minimize JavaScript payload
- **Database Optimization**: Efficient data queries

## Testing Architecture

### Testing Strategy

1. **Unit Tests**: Individual component testing
2. **Integration Tests**: Service layer testing
3. **Property-Based Tests**: Algorithm correctness
4. **E2E Tests**: Full user workflow testing
5. **Performance Tests**: Load and stress testing

### Test Structure

```
tests/
├── unit/
│   ├── components/
│   ├── services/
│   └── utils/
├── integration/
│   ├── api/
│   └── workflows/
├── property/
│   ├── calculations/
│   └── algorithms/
└── e2e/
    ├── user-flows/
    └── scenarios/
```

## Future Architecture Considerations

### Planned Enhancements

1. **Machine Learning**: Predictive analytics for crop recommendations
2. **Mobile App**: React Native implementation
3. **Offline Support**: Progressive Web App capabilities
4. **Multi-language**: Internationalization support
5. **Advanced Analytics**: Historical trend analysis

### Technology Evolution

1. **React 19**: Concurrent features and Suspense
2. **TypeScript 5+**: Latest language features
3. **Vite 5**: Enhanced build performance
4. **AWS Services**: New IoT and ML capabilities
5. **Edge Computing**: Cloudflare Workers integration

---

This architecture provides a solid foundation for the Smart Silo Storage Referee while maintaining flexibility for future enhancements and scaling requirements.