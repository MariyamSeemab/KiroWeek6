import React, { useState, useEffect } from 'react';
import TemperatureGauge from './TemperatureGauge';
import HumidityGauge from './HumidityGauge';
import ManualEnvironmentalInput from '../input/ManualEnvironmentalInput';
import ErrorBoundary from '../common/ErrorBoundary';
import { EnvironmentalData, IoTConnectionStatus } from '../../types/iot';
import iotService from '../../services/iotService';

interface GaugeContainerProps {
  onEnvironmentalDataChange?: (data: EnvironmentalData) => void;
}

const GaugeContainer: React.FC<GaugeContainerProps> = ({ onEnvironmentalDataChange }) => {
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData>({
    temperature: 31.8,
    humidity: 71.3,
    timestamp: new Date(),
    sensorId: 'static_default'
  });
  const [connectionStatus, setConnectionStatus] = useState<IoTConnectionStatus>({
    connected: false,
    lastUpdate: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [useManualInput, setUseManualInput] = useState(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(false);

  useEffect(() => {
    // Send initial static data to parent component
    onEnvironmentalDataChange?.(environmentalData);
  }, []); // Run once on mount

  useEffect(() => {
    // Only start IoT service if auto-update is enabled
    if (!autoUpdateEnabled) {
      return;
    }

    // Subscribe to IoT data
    const unsubscribeData = iotService.subscribe((data: EnvironmentalData) => {
      setEnvironmentalData(data);
      setIsLoading(false);
      setUseManualInput(false); // Switch back to auto mode when data is available
      onEnvironmentalDataChange?.(data);
    });

    // Subscribe to connection status
    const unsubscribeStatus = iotService.subscribeToStatus((status: IoTConnectionStatus) => {
      setConnectionStatus(status);
      if (status.connected) {
        setIsLoading(false);
      } else if (status.error && !status.connected) {
        // Automatically switch to manual mode if connection fails
        setUseManualInput(true);
        setIsLoading(false);
      }
    });

    // Start the IoT service with slower updates to prevent flickering
    iotService.startDataStream(30000); // Update every 30 seconds

    // Cleanup on unmount
    return () => {
      unsubscribeData();
      unsubscribeStatus();
      iotService.stopDataStream();
    };
  }, [onEnvironmentalDataChange, autoUpdateEnabled]);

  const handleManualInput = (data: EnvironmentalData) => {
    setEnvironmentalData(data);
    onEnvironmentalDataChange?.(data);
  };

  const handleRetryConnection = () => {
    setIsLoading(true);
    setUseManualInput(false);
    iotService.retry();
  };

  const toggleManualMode = () => {
    setUseManualInput(!useManualInput);
  };

  const toggleAutoUpdate = () => {
    const newAutoUpdateState = !autoUpdateEnabled;
    setAutoUpdateEnabled(newAutoUpdateState);
    
    if (!newAutoUpdateState) {
      // Stop auto updates and set to static values
      iotService.stopDataStream();
      setConnectionStatus({
        connected: false,
        lastUpdate: null
      });
      setIsLoading(false);
    } else {
      // Start auto updates and immediately show as connected
      setConnectionStatus({
        connected: true,
        lastUpdate: new Date()
      });
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        {/* Header with connection status */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Environmental Conditions
          </h3>
          <div className="flex items-center space-x-3">
            {/* Auto-update toggle */}
            <button
              onClick={toggleAutoUpdate}
              className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                autoUpdateEnabled 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-slate-600 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {autoUpdateEnabled ? 'Auto Updates ON' : 'Auto Updates OFF'}
            </button>
            
            {/* Connection indicator - only show when auto-update is enabled */}
            {autoUpdateEnabled && (
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  connectionStatus.connected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-slate-300">
                  {connectionStatus.connected ? 'IoT Connected' : 'IoT Disconnected'}
                </span>
              </div>
            )}
            
            {/* Manual mode toggle */}
            <button
              onClick={toggleManualMode}
              className="text-sm text-yellow-400 hover:text-yellow-300 underline transition-colors duration-200"
            >
              {useManualInput ? 'Hide Manual Input' : 'Manual Input'}
            </button>
          </div>
        </div>

        {/* Connection error message - only show when auto-update is enabled */}
        {autoUpdateEnabled && connectionStatus.error && !useManualInput && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-red-400 text-sm">
                <span className="mr-2">❌</span>
                {connectionStatus.error}
              </div>
              <button
                onClick={handleRetryConnection}
                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Manual input form (when manual mode is enabled) */}
        {useManualInput && (
          <ManualEnvironmentalInput
            onDataSubmit={handleManualInput}
            onRetryConnection={handleRetryConnection}
          />
        )}

        {/* Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ErrorBoundary>
            <TemperatureGauge 
              temperature={environmentalData.temperature}
              isLoading={isLoading && !useManualInput}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <HumidityGauge 
              humidity={environmentalData.humidity}
              isLoading={isLoading && !useManualInput}
            />
          </ErrorBoundary>
        </div>

        {/* Last update info */}
        <div className="text-xs text-slate-400 text-center">
          {autoUpdateEnabled ? (
            <>
              Last updated: {environmentalData.timestamp.toLocaleTimeString()} 
              {environmentalData.sensorId !== 'manual' && ` (Sensor: ${environmentalData.sensorId})`}
              {environmentalData.sensorId === 'manual' && ' (Manual input)'}
            </>
          ) : (
            <>
              Static values - {environmentalData.sensorId === 'static_default' ? 'Default' : 'Manual'} data
              {environmentalData.sensorId !== 'static_default' && ` (Set: ${environmentalData.timestamp.toLocaleTimeString()})`}
            </>
          )}
        </div>

        {/* Debug controls (for testing) */}
        {process.env.NODE_ENV === 'development' && autoUpdateEnabled && (
          <div className="mt-4 p-3 bg-slate-800 rounded text-xs border border-slate-700">
            <div className="font-medium mb-2 text-slate-300">Debug Controls:</div>
            <div className="space-x-2">
              <button
                onClick={() => iotService.simulateConnectionIssue(5000)}
                className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition-colors duration-200"
              >
                Simulate Connection Issue
              </button>
              <button
                onClick={() => iotService.startDataStream(5000)}
                className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition-colors duration-200"
              >
                Fast Updates (5s)
              </button>
              <button
                onClick={() => iotService.startDataStream(30000)}
                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors duration-200"
              >
                Normal Updates (30s)
              </button>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default GaugeContainer;