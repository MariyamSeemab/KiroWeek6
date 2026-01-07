import { EnvironmentalData, IoTConnectionStatus } from '../types/iot';

class IoTService {
  private subscribers: ((data: EnvironmentalData) => void)[] = [];
  private statusSubscribers: ((status: IoTConnectionStatus) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private reconnectTimeoutId: NodeJS.Timeout | null = null;
  private connectionStatus: IoTConnectionStatus = {
    connected: false,
    lastUpdate: null
  };
  private retryCount = 0;
  private maxRetries = 5;
  private baseRetryDelay = 1000; // 1 second
  
  // Store previous values for smoother transitions
  private lastTemperature = 28;
  private lastHumidity = 70;

  // Simulate realistic environmental data with smoother transitions
  private generateEnvironmentalData(): EnvironmentalData {
    // Base values with some realistic variation
    const baseTemp = 28; // Base temperature around 28°C
    const baseHumidity = 70; // Base humidity around 70%
    
    // Add smaller, more gradual changes to prevent dramatic flickering
    const tempChange = (Math.random() - 0.5) * 2; // ±1°C change per update
    const humidityChange = (Math.random() - 0.5) * 4; // ±2% change per update
    
    // Add some time-based patterns (simulate day/night cycles)
    const hour = new Date().getHours();
    const timeOfDayTempAdjustment = Math.sin((hour - 6) * Math.PI / 12) * 3; // Smaller variation
    const timeOfDayHumidityAdjustment = -Math.sin((hour - 6) * Math.PI / 12) * 5; // Smaller variation
    
    // Smooth transition from previous values
    this.lastTemperature = Math.max(20, Math.min(40, 
      this.lastTemperature + tempChange + (timeOfDayTempAdjustment - this.lastTemperature + baseTemp) * 0.1
    ));
    
    this.lastHumidity = Math.max(40, Math.min(90, 
      this.lastHumidity + humidityChange + (timeOfDayHumidityAdjustment - this.lastHumidity + baseHumidity) * 0.1
    ));

    return {
      temperature: Math.round(this.lastTemperature * 10) / 10, // Round to 1 decimal
      humidity: Math.round(this.lastHumidity * 10) / 10,
      timestamp: new Date(),
      sensorId: 'farm_001_env'
    };
  }

  // Start the IoT data stream with retry logic
  public startDataStream(intervalMs: number = 3000): void {
    if (this.intervalId) {
      this.stopDataStream();
    }

    this.attemptConnection(intervalMs);
  }

  private attemptConnection(intervalMs: number): void {
    // Simulate connection establishment with potential failure
    const connectionSuccess = Math.random() > 0.1; // 90% success rate
    
    setTimeout(() => {
      if (connectionSuccess) {
        this.connectionStatus = {
          connected: true,
          lastUpdate: new Date()
        };
        this.retryCount = 0; // Reset retry count on successful connection
        this.notifyStatusSubscribers();
        this.startDataGeneration(intervalMs);
      } else {
        this.handleConnectionFailure(intervalMs);
      }
    }, 1000);
  }

  private handleConnectionFailure(intervalMs: number): void {
    this.connectionStatus = {
      connected: false,
      lastUpdate: this.connectionStatus.lastUpdate,
      error: `Connection failed (attempt ${this.retryCount + 1}/${this.maxRetries})`
    };
    this.notifyStatusSubscribers();

    if (this.retryCount < this.maxRetries) {
      const retryDelay = this.baseRetryDelay * Math.pow(2, this.retryCount); // Exponential backoff
      this.retryCount++;
      
      this.reconnectTimeoutId = setTimeout(() => {
        console.log(`Retrying IoT connection (attempt ${this.retryCount}/${this.maxRetries})`);
        this.attemptConnection(intervalMs);
      }, retryDelay);
    } else {
      this.connectionStatus = {
        connected: false,
        lastUpdate: this.connectionStatus.lastUpdate,
        error: 'Max retry attempts reached. Please check connection and try again.'
      };
      this.notifyStatusSubscribers();
    }
  }

  private startDataGeneration(intervalMs: number): void {
    this.intervalId = setInterval(() => {
      try {
        const data = this.generateEnvironmentalData();
        
        // Update connection status
        this.connectionStatus = {
          connected: true,
          lastUpdate: data.timestamp
        };
        
        // Notify all subscribers
        this.subscribers.forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error('Error in IoT data subscriber:', error);
          }
        });
        this.notifyStatusSubscribers();
        
      } catch (error) {
        console.error('IoT Service Error:', error);
        this.connectionStatus = {
          connected: false,
          lastUpdate: this.connectionStatus.lastUpdate,
          error: 'Data generation failed'
        };
        this.notifyStatusSubscribers();
        
        // Attempt to reconnect
        this.stopDataStream();
        this.retryCount = 0;
        setTimeout(() => this.startDataStream(intervalMs), 2000);
      }
    }, intervalMs);
  }

  // Stop the data stream
  public stopDataStream(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
    
    this.connectionStatus = {
      connected: false,
      lastUpdate: this.connectionStatus.lastUpdate
    };
    this.notifyStatusSubscribers();
  }

  // Manual retry method for user-initiated reconnection
  public retry(): void {
    this.retryCount = 0;
    this.stopDataStream();
    this.startDataStream();
  }

  // Subscribe to environmental data updates
  public subscribe(callback: (data: EnvironmentalData) => void): () => void {
    this.subscribers.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  // Subscribe to connection status updates
  public subscribeToStatus(callback: (status: IoTConnectionStatus) => void): () => void {
    this.statusSubscribers.push(callback);
    
    // Immediately call with current status
    callback(this.connectionStatus);
    
    // Return unsubscribe function
    return () => {
      const index = this.statusSubscribers.indexOf(callback);
      if (index > -1) {
        this.statusSubscribers.splice(index, 1);
      }
    };
  }

  // Get current connection status
  public getConnectionStatus(): IoTConnectionStatus {
    return { ...this.connectionStatus };
  }

  // Simulate connection issues for testing
  public simulateConnectionIssue(durationMs: number = 5000): void {
    const wasConnected = this.connectionStatus.connected;
    
    this.connectionStatus = {
      connected: false,
      lastUpdate: this.connectionStatus.lastUpdate,
      error: 'Simulated connection issue'
    };
    this.notifyStatusSubscribers();

    setTimeout(() => {
      if (wasConnected && this.intervalId) {
        this.connectionStatus = {
          connected: true,
          lastUpdate: new Date(),
          error: undefined
        };
        this.notifyStatusSubscribers();
      }
    }, durationMs);
  }

  private notifyStatusSubscribers(): void {
    this.statusSubscribers.forEach(callback => callback(this.connectionStatus));
  }
}

// Export singleton instance
export const iotService = new IoTService();
export default iotService;