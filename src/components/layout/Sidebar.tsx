import React from 'react';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle, onPageChange, currentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'crops', label: 'Crops', icon: '🌾' },
    { id: 'storage', label: 'Storage', icon: '🏭' },
    { id: 'reports', label: 'Reports', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleItemClick = (itemId: string) => {
    onPageChange(itemId);
    console.log(`Navigating to ${itemId}`);
  };

  return (
    <div 
      className={`sidebar-transition bg-deep-navy border-r border-gold h-full flex flex-col ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      style={{ width: isExpanded ? '260px' : '80px' }}
    >
      {/* Header with toggle positioned at top-right */}
      <div className="relative p-4 border-b border-gold/20">
        {isExpanded && (
          <h2 className="text-gold font-bold text-lg pr-8">Storage Referee</h2>
        )}
        <button
          onClick={onToggle}
          className="absolute top-4 right-4 text-gold hover:text-yellow-300 transition-colors p-1 rounded"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  isExpanded ? 'space-x-3 justify-start' : 'justify-center'
                } ${
                  currentPage === item.id 
                    ? 'bg-gold/20 text-gold border border-gold/30' 
                    : 'text-gold hover:text-yellow-300 hover:bg-slate-800/50'
                }`}
                title={!isExpanded ? item.label : undefined}
              >
                <span className="text-xl flex-shrink-0" style={{ color: currentPage === item.id ? '#F59E0B' : '#F59E0B' }}>
                  {item.icon}
                </span>
                {isExpanded && (
                  <span className="font-medium text-left">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gold/20">
        <div className={`flex items-center text-gold/70 ${
          isExpanded ? 'space-x-3' : 'justify-center'
        }`}>
          <span className="text-xl">👤</span>
          {isExpanded && (
            <div>
              <p className="text-sm font-medium">Farmer Portal</p>
              <p className="text-xs">v1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;