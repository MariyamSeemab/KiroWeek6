export interface EnvironmentalData {
  temperature: number;
  humidity: number;
  timestamp: Date;
  sensorId: string;
}

export interface IoTConnectionStatus {
  connected: boolean;
  lastUpdate: Date | null;
  error?: string;
}