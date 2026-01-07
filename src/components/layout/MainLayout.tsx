import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContextualInputPanel from '../input/ContextualInputPanel';
import GaugeContainer from '../charts/GaugeContainer';
import ComparisonMatrix from '../comparison/ComparisonMatrix';
import VerdictCard from '../comparison/VerdictCard';
import CropsEncyclopedia from '../pages/CropsEncyclopedia';
import StorageManagement from '../pages/StorageManagement';
import ReportsAnalytics from '../pages/ReportsAnalytics';
import Settings from '../pages/Settings';
import { CropType, DecisionResult } from '../../types/storage';
import { EnvironmentalData } from '../../types/iot';

interface InputData {
  crop: CropType | null;
  distance: number;
  volume: number;
}

const MainLayout: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [inputData, setInputData] = useState<InputData>({
    crop: null,
    distance: 25,
    volume: 100
  });
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData>({
    temperature: 28.5,
    humidity: 72.3,
    timestamp: new Date(),
    sensorId: 'farm_001_env'
  });
  const [decision, setDecision] = useState<DecisionResult | null>(null);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleInputChange = (data: InputData) => {
    setInputData(data);
  };

  const handleEnvironmentalDataChange = (data: EnvironmentalData) => {
    setEnvironmentalData(data);
  };

  const handleDecisionChange = (newDecision: DecisionResult | null) => {
    setDecision(newDecision);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'crops':
        return <CropsEncyclopedia />;
      case 'storage':
        return <StorageManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <Settings />;
      default: // dashboard
        return (
          <div className="max-w-7xl mx-auto">
            <header className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Smart-Silo Storage Referee
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                Real-time decision support for optimal harvest storage
              </p>
            </header>
            
            {/* Contextual Input Panel */}
            <ContextualInputPanel onInputChange={handleInputChange} />

            {/* IoT Environmental Hub and Comparison Matrix */}
            <section className="mb-6 sm:mb-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-slate-200">
                  <GaugeContainer onEnvironmentalDataChange={handleEnvironmentalDataChange} />
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-slate-200">
                  <ComparisonMatrix
                    crop={inputData.crop}
                    volume={inputData.volume}
                    distance={inputData.distance}
                    environmentalData={environmentalData}
                    onDecisionChange={handleDecisionChange}
                  />
                </div>
              </div>
            </section>

            {/* Verdict Card */}
            <section>
              <VerdictCard
                decision={decision}
                crop={inputData.crop}
                volume={inputData.volume}
                environmentalData={environmentalData}
              />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        isExpanded={sidebarExpanded} 
        onToggle={handleSidebarToggle}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      <main 
        className="flex-1 sidebar-transition p-4 sm:p-6 overflow-auto"
        style={{
          marginLeft: 0, // Flex handles the layout automatically
          width: `calc(100vw - ${sidebarExpanded ? '260px' : '80px'})`
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default MainLayout;