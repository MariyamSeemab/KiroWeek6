# Smart Silo Storage Referee

An intelligent Agri-FinTech decision engine that helps Indian farmers minimize post-harvest losses by providing real-time, data-backed comparisons between Industrial Cold Storage and On-Farm Solar Drying options.

## 🌾 Overview

The Smart Silo Storage Referee combines IoT environmental data, market pricing information, and risk analysis to deliver actionable recommendations that maximize profitability while minimizing post-harvest losses. The system provides farmers and Farmer Producer Organizations (FPOs) with professional-grade decision support tools.

## ✨ Key Features

- **Real-time Environmental Monitoring**: IoT-powered temperature and humidity gauges with risk assessment
- **Dynamic Storage Comparison**: Side-by-side financial analysis of Cold Storage vs Solar Drying
- **Intelligent Decision Engine**: AI-powered recommendations based on current conditions and market data
- **Professional Dashboard**: Responsive design with collapsible sidebar navigation
- **Risk Assessment**: Weather-based risk penalties and carbon footprint analysis
- **Market Integration**: Real-time crop pricing and storage cost calculations

## 🚀 Live Demo

Visit the live application: [Smart Silo Storage Referee](https://your-vercel-url.vercel.app)

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: React Gauge Chart
- **Build Tool**: Vite
- **Cloud Services**: AWS IoT Core, AWS S3
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- AWS account (for IoT and S3 services)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-silo-storage-referee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_AWS_REGION=your-aws-region
   VITE_IOT_ENDPOINT=your-iot-endpoint
   VITE_S3_BUCKET=your-s3-bucket
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, MainLayout components
│   ├── input/           # CropSelector, DistanceSlider, VolumeInput
│   ├── charts/          # Temperature & Humidity gauges
│   ├── comparison/      # Storage comparison matrix
│   └── common/          # Shared components (ErrorBoundary, SkeletonLoader)
├── services/
│   ├── calculationEngine.ts    # Core decision logic
│   ├── iotService.ts          # AWS IoT integration
│   └── marketDataService.ts   # Market data fetching
├── types/               # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🎯 Usage

### Basic Workflow

1. **Select Crop Type**: Choose from Wheat, Chili, or Tomato
2. **Set Parameters**: Adjust harvest volume and distance to cold storage
3. **Monitor Environment**: View real-time temperature and humidity data
4. **Compare Options**: Review financial breakdown for both storage methods
5. **Get Recommendation**: Receive AI-powered decision with detailed reasoning
6. **Download Report**: Generate decision report for documentation

### Storage Options Compared

**Industrial Cold Storage**
- ✅ Low spoilage risk (2-5%)
- ✅ Extended shelf life
- ❌ High storage costs
- ❌ Transport expenses
- ❌ High carbon footprint

**On-Farm Solar Drying**
- ✅ Zero energy costs
- ✅ Zero carbon footprint
- ✅ No transport required
- ❌ Weather-dependent risk
- ❌ Limited shelf life

## 📊 Decision Engine Logic

The recommendation algorithm considers:

- **Environmental Risk**: Humidity levels affect solar drying success rates
- **Transport Costs**: Distance-based calculations for cold storage
- **Market Prices**: Real-time crop pricing from market data
- **Spoilage Rates**: Crop-specific loss percentages for each method
- **Carbon Impact**: Environmental footprint assessment

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The project uses both unit tests and property-based testing with fast-check for comprehensive coverage.

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   Configure your AWS credentials and endpoints in the Vercel dashboard.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🔧 Configuration

### AWS IoT Setup

1. Create an IoT Thing in AWS IoT Core
2. Generate certificates and policies
3. Configure MQTT topics for environmental data
4. Update the IoT endpoint in your environment variables

### Market Data Setup

1. Create an S3 bucket for market data storage
2. Upload crop pricing and storage cost data
3. Configure appropriate IAM permissions
4. Update the S3 bucket name in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the [Architecture Documentation](./architecture.md) for technical details

## 🙏 Acknowledgments

- Indian farmers and FPOs for providing domain expertise
- AWS for cloud infrastructure services
- React and Vite communities for excellent tooling
- Tailwind CSS for responsive design framework

---

**Built with ❤️ for Indian Agriculture**