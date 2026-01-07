import React, { useState } from 'react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  format: 'pdf' | 'excel' | 'csv';
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
}

interface ReportData {
  id: string;
  title: string;
  generatedDate: string;
  type: string;
  status: 'completed' | 'processing' | 'failed';
  size: string;
}

const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'templates' | 'history'>('generate');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [reportData, setReportData] = useState({
    dateFrom: '',
    dateTo: '',
    crops: [] as string[],
    storageTypes: [] as string[],
    includeCharts: true,
    includeCostAnalysis: true,
    includeRecommendations: true
  });

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'storage_analysis',
      name: 'Storage Analysis Report',
      description: 'Comprehensive analysis of storage decisions, costs, and outcomes',
      sections: ['Executive Summary', 'Storage Decisions', 'Cost Analysis', 'ROI Calculation', 'Recommendations'],
      format: 'pdf',
      frequency: 'monthly'
    },
    {
      id: 'crop_performance',
      name: 'Crop Performance Report',
      description: 'Detailed performance metrics for different crops and storage methods',
      sections: ['Crop Overview', 'Storage Performance', 'Spoilage Analysis', 'Market Trends', 'Profitability'],
      format: 'excel',
      frequency: 'weekly'
    },
    {
      id: 'financial_summary',
      name: 'Financial Summary Report',
      description: 'Financial overview of storage operations and profitability analysis',
      sections: ['Revenue Summary', 'Cost Breakdown', 'Profit Analysis', 'Budget vs Actual', 'Forecasting'],
      format: 'pdf',
      frequency: 'monthly'
    },
    {
      id: 'environmental_impact',
      name: 'Environmental Impact Report',
      description: 'Analysis of environmental factors and their impact on storage decisions',
      sections: ['Weather Analysis', 'Environmental Conditions', 'Impact on Storage', 'Sustainability Metrics'],
      format: 'pdf',
      frequency: 'monthly'
    },
    {
      id: 'operational_dashboard',
      name: 'Operational Dashboard',
      description: 'Real-time operational metrics and KPIs for storage management',
      sections: ['Key Metrics', 'Storage Utilization', 'Quality Indicators', 'Alerts & Notifications'],
      format: 'excel',
      frequency: 'daily'
    }
  ];

  const reportHistory: ReportData[] = [
    {
      id: '1',
      title: 'Storage Analysis Report - November 2024',
      generatedDate: '2024-11-30',
      type: 'Storage Analysis',
      status: 'completed',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Crop Performance Report - Week 47',
      generatedDate: '2024-11-25',
      type: 'Crop Performance',
      status: 'completed',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Financial Summary - Q4 2024',
      generatedDate: '2024-11-20',
      type: 'Financial Summary',
      status: 'processing',
      size: '-'
    },
    {
      id: '4',
      title: 'Environmental Impact Report - November',
      generatedDate: '2024-11-15',
      type: 'Environmental Impact',
      status: 'completed',
      size: '3.1 MB'
    }
  ];

  const cropOptions = ['Wheat', 'Rice', 'Corn', 'Chili', 'Tomato', 'Onion', 'Potato', 'Soybean', 'Cotton', 'Sugarcane'];
  const storageOptions = ['Cold Storage', 'Solar Drying', 'Traditional Warehouse', 'Grain Silo', 'Controlled Atmosphere', 'Hermetic Storage'];

  const generateReport = () => {
    // Simulate report generation
    alert('Report generation started! You will be notified when it\'s ready.');
  };

  const downloadReport = (reportId: string) => {
    // Simulate report download
    alert(`Downloading report ${reportId}...`);
  };

  const previewReport = () => {
    // Generate preview content based on selected template and data
    const template = reportTemplates.find(t => t.id === selectedTemplate);
    if (!template) return null;

    return (
      <div className="bg-white border border-slate-300 rounded-lg p-6 mt-6">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{template.name}</h1>
              <p className="text-slate-600 mt-1">Generated on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Smart-Silo Storage Referee</div>
              <div className="text-sm text-slate-500">Report ID: SR-{Date.now()}</div>
            </div>
          </div>
        </div>

        {template.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3 border-l-4 border-gold pl-3">
              {section}
            </h2>
            <div className="bg-slate-50 p-4 rounded border">
              {section === 'Executive Summary' && (
                <div>
                  <p className="text-slate-700 mb-3">
                    This report analyzes storage decisions and performance for the period from {reportData.dateFrom || 'N/A'} to {reportData.dateTo || 'N/A'}.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border">
                      <div className="text-sm text-slate-600">Total Decisions</div>
                      <div className="text-xl font-bold text-slate-800">247</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="text-sm text-slate-600">Avg. Profit</div>
                      <div className="text-xl font-bold text-green-600">₹45,230</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="text-sm text-slate-600">Success Rate</div>
                      <div className="text-xl font-bold text-blue-600">94.2%</div>
                    </div>
                  </div>
                </div>
              )}
              {section === 'Storage Decisions' && (
                <div>
                  <p className="text-slate-700 mb-3">Analysis of storage method recommendations:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cold Storage Recommendations:</span>
                      <span className="font-semibold">156 (63.2%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Solar Drying Recommendations:</span>
                      <span className="font-semibold">91 (36.8%)</span>
                    </div>
                  </div>
                </div>
              )}
              {section === 'Cost Analysis' && reportData.includeCostAnalysis && (
                <div>
                  <p className="text-slate-700 mb-3">Financial breakdown of storage operations:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-600">Total Storage Costs</div>
                      <div className="text-lg font-bold text-red-600">₹12,45,000</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Total Revenue</div>
                      <div className="text-lg font-bold text-green-600">₹23,67,000</div>
                    </div>
                  </div>
                </div>
              )}
              {section === 'Recommendations' && reportData.includeRecommendations && (
                <div>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Consider increasing solar drying capacity for better cost efficiency</li>
                    <li>• Monitor humidity levels more closely during monsoon season</li>
                    <li>• Evaluate cold storage partnerships for high-value crops</li>
                  </ul>
                </div>
              )}
              {!['Executive Summary', 'Storage Decisions', 'Cost Analysis', 'Recommendations'].includes(section) && (
                <p className="text-slate-500 italic">[{section} content will be generated based on actual data]</p>
              )}
            </div>
          </div>
        ))}

        <div className="border-t border-slate-200 pt-4 mt-6">
          <div className="text-xs text-slate-500 text-center">
            This report was generated by Smart-Silo Storage Referee on {new Date().toLocaleString()}
            <br />
            For support, contact: support@smart-silo.com
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports & Analytics</h1>
        <p className="text-slate-600">Generate comprehensive reports and analyze your storage performance</p>
      </header>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'generate', label: 'Generate Report', icon: '📊' },
              { id: 'templates', label: 'Templates', icon: '📋' },
              { id: 'history', label: 'Report History', icon: '📚' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-gold text-gold'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Generate Report Tab */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Report Template Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Report Template</h3>
              <div className="space-y-3">
                {reportTemplates.map((template) => (
                  <label key={template.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={selectedTemplate === template.id}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{template.name}</div>
                      <div className="text-sm text-slate-600">{template.description}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Format: {template.format.toUpperCase()} • Frequency: {template.frequency}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Report Configuration */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Report Configuration</h3>
              
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={reportData.dateFrom}
                    onChange={(e) => setReportData({...reportData, dateFrom: e.target.value})}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={reportData.dateTo}
                    onChange={(e) => setReportData({...reportData, dateTo: e.target.value})}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              {/* Crop Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Include Crops</label>
                <div className="grid grid-cols-2 gap-2">
                  {cropOptions.map((crop) => (
                    <label key={crop} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={reportData.crops.includes(crop)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setReportData({...reportData, crops: [...reportData.crops, crop]});
                          } else {
                            setReportData({...reportData, crops: reportData.crops.filter(c => c !== crop)});
                          }
                        }}
                      />
                      <span className="text-sm text-slate-700">{crop}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportData.includeCharts}
                    onChange={(e) => setReportData({...reportData, includeCharts: e.target.checked})}
                  />
                  <span className="text-sm text-slate-700">Include Charts and Graphs</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportData.includeCostAnalysis}
                    onChange={(e) => setReportData({...reportData, includeCostAnalysis: e.target.checked})}
                  />
                  <span className="text-sm text-slate-700">Include Cost Analysis</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportData.includeRecommendations}
                    onChange={(e) => setReportData({...reportData, includeRecommendations: e.target.checked})}
                  />
                  <span className="text-sm text-slate-700">Include Recommendations</span>
                </label>
              </div>

              <button
                onClick={generateReport}
                disabled={!selectedTemplate}
                className="w-full mt-6 bg-gold text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Generate Report
              </button>
            </div>
          </div>

          {/* Report Preview */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Report Preview</h3>
            {selectedTemplate ? (
              previewReport()
            ) : (
              <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <div className="text-slate-400 text-4xl mb-4">📄</div>
                <p className="text-slate-600">Select a report template to see preview</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{template.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{template.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Format:</span>
                  <span className="font-medium text-slate-800">{template.format.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Frequency:</span>
                  <span className="font-medium text-slate-800">{template.frequency}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Sections:</h4>
                <div className="space-y-1">
                  {template.sections.map((section, index) => (
                    <div key={index} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                      {section}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-gold text-white py-2 px-4 rounded text-sm hover:bg-yellow-600 transition-colors">
                  Use Template
                </button>
                <button className="px-4 py-2 border border-slate-300 rounded text-sm hover:bg-slate-50 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">Report History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Report Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Generated</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Size</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {reportHistory.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{report.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{report.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{new Date(report.generatedDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'completed' ? 'bg-green-100 text-green-800' :
                        report.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{report.size}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {report.status === 'completed' && (
                          <button
                            onClick={() => downloadReport(report.id)}
                            className="text-gold hover:text-yellow-600 text-sm font-medium"
                          >
                            Download
                          </button>
                        )}
                        <button className="text-slate-600 hover:text-slate-800 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;