import React, { useState } from 'react';

interface SettingsData {
  // General Settings
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  
  // Report Settings
  defaultReportFormat: string;
  includeChartsDefault: boolean;
  includeCostAnalysisDefault: boolean;
  includeRecommendationsDefault: boolean;
  reportHeaderLogo: boolean;
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  
  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  reportReadyNotification: boolean;
  systemAlertsNotification: boolean;
  
  // Storage Settings
  defaultStorageCapacity: number;
  defaultTransportDistance: number;
  preferredStorageMethod: string;
  
  // Environmental Settings
  temperatureUnit: string;
  humidityThreshold: number;
  weatherDataSource: string;
  
  // Advanced Settings
  dataRetentionPeriod: number;
  autoBackup: boolean;
  debugMode: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'reports' | 'notifications' | 'storage' | 'advanced'>('general');
  const [settings, setSettings] = useState<SettingsData>({
    // General Settings
    language: 'en',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    
    // Report Settings
    defaultReportFormat: 'pdf',
    includeChartsDefault: true,
    includeCostAnalysisDefault: true,
    includeRecommendationsDefault: true,
    reportHeaderLogo: true,
    companyName: 'Smart-Silo Storage Referee',
    companyAddress: 'Agricultural Technology Center, India',
    contactEmail: 'support@smart-silo.com',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    reportReadyNotification: true,
    systemAlertsNotification: true,
    
    // Storage Settings
    defaultStorageCapacity: 1000,
    defaultTransportDistance: 25,
    preferredStorageMethod: 'auto',
    
    // Environmental Settings
    temperatureUnit: 'celsius',
    humidityThreshold: 70,
    weatherDataSource: 'local',
    
    // Advanced Settings
    dataRetentionPeriod: 365,
    autoBackup: true,
    debugMode: false
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const updateSetting = (key: keyof SettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setUnsavedChanges(true);
  };

  const saveSettings = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings);
    setUnsavedChanges(false);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      setUnsavedChanges(true);
      alert('Settings reset to defaults. Click Save to apply changes.');
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'smart-silo-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          setUnsavedChanges(true);
          alert('Settings imported successfully! Click Save to apply changes.');
        } catch (error) {
          alert('Error importing settings. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Customize your Smart-Silo Storage Referee experience</p>
        {unsavedChanges && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">⚠️ You have unsaved changes. Don't forget to save your settings.</p>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {[
              { id: 'general', label: 'General', icon: '⚙️' },
              { id: 'reports', label: 'Reports', icon: '📊' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
              { id: 'storage', label: 'Storage', icon: '🏭' },
              { id: 'advanced', label: 'Advanced', icon: '🔧' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gold text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={saveSettings}
              disabled={!unsavedChanges}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Save Settings
            </button>
            <button
              onClick={resetSettings}
              className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Reset to Defaults
            </button>
            <button
              onClick={exportSettings}
              className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Export Settings
            </button>
            <label className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer block text-center">
              Import Settings
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => updateSetting('language', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="te">Telugu</option>
                      <option value="ta">Tamil</option>
                      <option value="bn">Bengali</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => updateSetting('timezone', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => updateSetting('currency', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => updateSetting('dateFormat', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Report Settings */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3">Report Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Default Report Format</label>
                    <select
                      value={settings.defaultReportFormat}
                      onChange={(e) => updateSetting('defaultReportFormat', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-800">Default Report Content</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.includeChartsDefault}
                          onChange={(e) => updateSetting('includeChartsDefault', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">Include Charts and Graphs by default</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.includeCostAnalysisDefault}
                          onChange={(e) => updateSetting('includeCostAnalysisDefault', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">Include Cost Analysis by default</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.includeRecommendationsDefault}
                          onChange={(e) => updateSetting('includeRecommendationsDefault', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">Include Recommendations by default</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.reportHeaderLogo}
                          onChange={(e) => updateSetting('reportHeaderLogo', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">Include company logo in report header</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) => updateSetting('companyName', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => updateSetting('contactEmail', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Address</label>
                    <textarea
                      value={settings.companyAddress}
                      onChange={(e) => updateSetting('companyAddress', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 mb-4">Notification Channels</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">Email Notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) => updateSetting('smsNotifications', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">SMS Notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">Push Notifications</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-slate-800 mb-4">Notification Types</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.reportReadyNotification}
                          onChange={(e) => updateSetting('reportReadyNotification', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">Report Ready Notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.systemAlertsNotification}
                          onChange={(e) => updateSetting('systemAlertsNotification', e.target.checked)}
                          className="rounded border-slate-300 text-gold focus:ring-gold"
                        />
                        <span className="text-slate-700">System Alerts and Warnings</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Storage Settings */}
            {activeTab === 'storage' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3">Storage Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Default Storage Capacity (quintals)</label>
                    <input
                      type="number"
                      value={settings.defaultStorageCapacity}
                      onChange={(e) => updateSetting('defaultStorageCapacity', parseInt(e.target.value))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Default Transport Distance (km)</label>
                    <input
                      type="number"
                      value={settings.defaultTransportDistance}
                      onChange={(e) => updateSetting('defaultTransportDistance', parseInt(e.target.value))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Storage Method</label>
                    <select
                      value={settings.preferredStorageMethod}
                      onChange={(e) => updateSetting('preferredStorageMethod', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="auto">Auto (AI Recommendation)</option>
                      <option value="cold_storage">Cold Storage</option>
                      <option value="solar_drying">Solar Drying</option>
                      <option value="warehouse">Traditional Warehouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Temperature Unit</label>
                    <select
                      value={settings.temperatureUnit}
                      onChange={(e) => updateSetting('temperatureUnit', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="celsius">Celsius (°C)</option>
                      <option value="fahrenheit">Fahrenheit (°F)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Humidity Threshold (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.humidityThreshold}
                      onChange={(e) => updateSetting('humidityThreshold', parseInt(e.target.value))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Weather Data Source</label>
                    <select
                      value={settings.weatherDataSource}
                      onChange={(e) => updateSetting('weatherDataSource', e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    >
                      <option value="local">Local Sensors</option>
                      <option value="api">Weather API</option>
                      <option value="manual">Manual Input</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3">Advanced Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Data Retention Period (days)</label>
                    <input
                      type="number"
                      value={settings.dataRetentionPeriod}
                      onChange={(e) => updateSetting('dataRetentionPeriod', parseInt(e.target.value))}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                    />
                    <p className="text-sm text-slate-500 mt-1">How long to keep historical data before automatic deletion</p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) => updateSetting('autoBackup', e.target.checked)}
                        className="rounded border-slate-300 text-gold focus:ring-gold"
                      />
                      <span className="text-slate-700">Enable Automatic Backup</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.debugMode}
                        onChange={(e) => updateSetting('debugMode', e.target.checked)}
                        className="rounded border-slate-300 text-gold focus:ring-gold"
                      />
                      <span className="text-slate-700">Enable Debug Mode</span>
                    </label>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">⚠️ Warning</h4>
                    <p className="text-sm text-yellow-700">
                      Advanced settings can affect system performance and data integrity. 
                      Only modify these settings if you understand their implications.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;