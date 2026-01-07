declare module 'react-gauge-chart' {
  import { ComponentType } from 'react';

  interface GaugeChartProps {
    id: string;
    nrOfLevels?: number;
    colors?: string[];
    arcsLength?: number[];
    arcWidth?: number;
    percent: number;
    textColor?: string;
    needleColor?: string;
    needleBaseColor?: string;
    hideText?: boolean;
    animate?: boolean;
    animateDuration?: number;
  }

  const GaugeChart: ComponentType<GaugeChartProps>;
  export default GaugeChart;
}