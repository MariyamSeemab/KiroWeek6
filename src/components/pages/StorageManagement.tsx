import React, { useState } from 'react';

interface StorageType {
  id: string;
  name: string;
  icon: string;
  description: string;
  setupCost: number;
  operationalCost: number;
  capacity: string;
  suitableFor: string[];
  advantages: string[];
  disadvantages: string[];
  maintenanceCost: number;
  lifespan: string;
  temperatureRange: string;
  humidityControl: boolean;
  spoilageRate: number;
}

const StorageManagement: React.FC = () => {
  const [selectedStorage, setSelectedStorage] = useState<StorageType | null>(null);

  const storageTypes: StorageType[] = [
    {
      id: 'cold_storage',
      name: 'Cold Storage Facility',
      icon: '🏭',
      description: 'Temperature-controlled storage facility with refrigeration systems for preserving perishable crops and extending shelf life.',
      setupCost: 2500000, // ₹25 lakhs
      operationalCost: 50, // per quintal per month
      capacity: '500-5000 quintals',
      suitableFor: ['Fruits', 'Vegetables', 'Dairy products', 'Meat', 'Processed foods'],
      advantages: [
        'Significantly extends shelf life',
        'Maintains nutritional value',
        'Reduces spoilage to minimum',
        'Year-round availability',
        'Premium pricing for off-season sales'
      ],
      disadvantages: [
        'High initial investment',
        'Continuous electricity requirement',
        'High operational costs',
        'Requires skilled maintenance',
        'Not suitable for all crop types'
      ],
      maintenanceCost: 50000, // per year
      lifespan: '15-20 years',
      temperatureRange: '0-4°C',
      humidityControl: true,
      spoilageRate: 0.02
    },
    {
      id: 'solar_drying',
      name: 'Solar Drying System',
      icon: '☀️',
      description: 'Eco-friendly drying system that uses solar energy to remove moisture from crops, preventing spoilage and extending storage life.',
      setupCost: 150000, // ₹1.5 lakhs
      operationalCost: 0, // No operational cost
      capacity: '100-1000 quintals',
      suitableFor: ['Grains', 'Spices', 'Herbs', 'Fruits (for dried products)', 'Vegetables'],
      advantages: [
        'Zero operational cost',
        'Environmentally friendly',
        'Low maintenance',
        'Suitable for rural areas',
        'Government subsidies available'
      ],
      disadvantages: [
        'Weather dependent',
        'Slower processing time',
        'Limited capacity',
        'Not suitable for all crops',
        'Quality depends on weather conditions'
      ],
      maintenanceCost: 5000, // per year
      lifespan: '10-15 years',
      temperatureRange: '40-60°C',
      humidityControl: false,
      spoilageRate: 0.08
    },
    {
      id: 'warehouse',
      name: 'Traditional Warehouse',
      icon: '🏪',
      description: 'Conventional storage facility with basic ventilation and pest control for storing dry grains and non-perishable items.',
      setupCost: 800000, // ₹8 lakhs
      operationalCost: 15, // per quintal per month
      capacity: '1000-10000 quintals',
      suitableFor: ['Wheat', 'Rice', 'Corn', 'Pulses', 'Cotton', 'Jute'],
      advantages: [
        'Lower setup cost than cold storage',
        'Large capacity',
        'Suitable for bulk storage',
        'Easy to construct',
        'Low operational costs'
      ],
      disadvantages: [
        'Limited climate control',
        'Higher spoilage rates',
        'Pest infestation risk',
        'Weather dependent',
        'Not suitable for perishables'
      ],
      maintenanceCost: 25000, // per year
      lifespan: '20-25 years',
      temperatureRange: 'Ambient',
      humidityControl: false,
      spoilageRate: 0.05
    },
    {
      id: 'silo',
      name: 'Grain Silo',
      icon: '🗼',
      description: 'Vertical storage structure designed specifically for bulk storage of grains with controlled atmosphere and automated handling systems.',
      setupCost: 1200000, // ₹12 lakhs
      operationalCost: 25, // per quintal per month
      capacity: '2000-15000 quintals',
      suitableFor: ['Wheat', 'Rice', 'Corn', 'Barley', 'Soybean', 'Sunflower seeds'],
      advantages: [
        'Excellent for bulk grain storage',
        'Automated loading/unloading',
        'Good pest control',
        'Space efficient',
        'Maintains grain quality'
      ],
      disadvantages: [
        'High initial investment',
        'Requires technical expertise',
        'Limited to grain crops',
        'Complex maintenance',
        'Not suitable for mixed storage'
      ],
      maintenanceCost: 35000, // per year
      lifespan: '25-30 years',
      temperatureRange: 'Controlled ambient',
      humidityControl: true,
      spoilageRate: 0.03
    },
    {
      id: 'controlled_atmosphere',
      name: 'Controlled Atmosphere Storage',
      icon: '🌡️',
      description: 'Advanced storage system that controls temperature, humidity, and gas composition to maximize storage life of produce.',
      setupCost: 4000000, // ₹40 lakhs
      operationalCost: 80, // per quintal per month
      capacity: '200-2000 quintals',
      suitableFor: ['Apples', 'Potatoes', 'Onions', 'Citrus fruits', 'Exotic vegetables'],
      advantages: [
        'Maximum shelf life extension',
        'Maintains premium quality',
        'Precise environmental control',
        'Highest market value retention',
        'Suitable for export quality'
      ],
      disadvantages: [
        'Very high investment',
        'Complex operation',
        'High energy consumption',
        'Requires specialized training',
        'Limited crop variety'
      ],
      maintenanceCost: 100000, // per year
      lifespan: '15-20 years',
      temperatureRange: '0-15°C (variable)',
      humidityControl: true,
      spoilageRate: 0.01
    },
    {
      id: 'hermetic_storage',
      name: 'Hermetic Storage Bags',
      icon: '🎒',
      description: 'Airtight storage bags that create oxygen-free environment to prevent pest infestation and maintain grain quality.',
      setupCost: 50000, // ₹50,000
      operationalCost: 5, // per quintal per month
      capacity: '50-500 quintals',
      suitableFor: ['Rice', 'Wheat', 'Corn', 'Pulses', 'Coffee beans', 'Cocoa'],
      advantages: [
        'Very low investment',
        'Excellent pest control',
        'Chemical-free storage',
        'Portable and flexible',
        'Easy to use'
      ],
      disadvantages: [
        'Limited capacity',
        'Bag replacement needed',
        'Manual handling required',
        'Not suitable for large operations',
        'Vulnerable to physical damage'
      ],
      maintenanceCost: 2000, // per year
      lifespan: '3-5 years',
      temperatureRange: 'Ambient',
      humidityControl: false,
      spoilageRate: 0.04
    }
  ];

  if (selectedStorage) {
    return (
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => setSelectedStorage(null)}
          className="mb-6 flex items-center space-x-2 text-gold hover:text-yellow-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Storage Types</span>
        </button>

        {/* Storage Detail Page */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center space-x-4">
              <span className="text-6xl">{selectedStorage.icon}</span>
              <div>
                <h1 className="text-4xl font-bold">{selectedStorage.name}</h1>
                <p className="text-xl">Capacity: {selectedStorage.capacity}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <section className="mb-8">
              <p className="text-lg text-slate-700 leading-relaxed">{selectedStorage.description}</p>
            </section>

            {/* Cost Analysis */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Cost Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-700">Setup Cost</h3>
                  <p className="text-2xl font-bold text-green-800">₹{selectedStorage.setupCost.toLocaleString()}</p>
                  <p className="text-sm text-green-600">One-time investment</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-700">Operational Cost</h3>
                  <p className="text-2xl font-bold text-blue-800">₹{selectedStorage.operationalCost}/quintal</p>
                  <p className="text-sm text-blue-600">Per month</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-700">Maintenance Cost</h3>
                  <p className="text-2xl font-bold text-orange-800">₹{selectedStorage.maintenanceCost.toLocaleString()}</p>
                  <p className="text-sm text-orange-600">Per year</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-700">Lifespan</h3>
                  <p className="text-2xl font-bold text-purple-800">{selectedStorage.lifespan}</p>
                  <p className="text-sm text-purple-600">Expected duration</p>
                </div>
              </div>
            </section>

            {/* Technical Specifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Temperature Range</h3>
                  <p className="text-slate-600">{selectedStorage.temperatureRange}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Humidity Control</h3>
                  <p className="text-slate-600">{selectedStorage.humidityControl ? 'Available' : 'Not Available'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Spoilage Rate</h3>
                  <p className="text-slate-600">{(selectedStorage.spoilageRate * 100).toFixed(1)}%</p>
                </div>
              </div>
            </section>

            {/* Suitable Crops */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Suitable For</h2>
              <div className="flex flex-wrap gap-2">
                {selectedStorage.suitableFor.map((crop, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {crop}
                  </span>
                ))}
              </div>
            </section>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Advantages */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Advantages</h2>
                <ul className="space-y-2">
                  {selectedStorage.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Disadvantages */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Disadvantages</h2>
                <ul className="space-y-2">
                  {selectedStorage.disadvantages.map((disadvantage, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700">{disadvantage}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ROI Calculator */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">ROI Calculator</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Storage Volume (quintals)</label>
                    <input type="number" defaultValue="1000" className="w-full p-2 border border-slate-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Storage Duration (months)</label>
                    <input type="number" defaultValue="6" className="w-full p-2 border border-slate-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Crop Price (₹/quintal)</label>
                    <input type="number" defaultValue="2500" className="w-full p-2 border border-slate-300 rounded" />
                  </div>
                </div>
                <button className="bg-gold text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                  Calculate ROI
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Storage Management</h1>
        <p className="text-slate-600">Comprehensive guide to different storage types, costs, and suitability for various crops</p>
      </header>

      {/* Storage Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storageTypes.map((storage) => (
          <div
            key={storage.id}
            onClick={() => setSelectedStorage(storage)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-slate-200 hover:border-gold"
          >
            <div className="p-6">
              <div className="text-center mb-4">
                <span className="text-5xl">{storage.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">{storage.name}</h3>
              <p className="text-sm text-slate-600 mb-4 text-center line-clamp-2">{storage.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Setup Cost:</span>
                  <span className="text-sm font-semibold text-green-600">₹{(storage.setupCost / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Operational:</span>
                  <span className="text-sm text-slate-700">₹{storage.operationalCost}/quintal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Capacity:</span>
                  <span className="text-sm text-slate-700">{storage.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Spoilage:</span>
                  <span className="text-sm text-slate-700">{(storage.spoilageRate * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <button className="w-full text-gold hover:text-yellow-600 font-medium text-sm transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Storage Comparison</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Storage Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Setup Cost</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Operational Cost</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Spoilage Rate</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {storageTypes.map((storage) => (
                  <tr key={storage.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{storage.icon}</span>
                        <span className="font-medium text-slate-800">{storage.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">₹{(storage.setupCost / 100000).toFixed(1)}L</td>
                    <td className="px-4 py-3 text-slate-600">₹{storage.operationalCost}/quintal</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        storage.spoilageRate <= 0.02 ? 'bg-green-100 text-green-800' :
                        storage.spoilageRate <= 0.05 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {(storage.spoilageRate * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{storage.suitableFor.slice(0, 2).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorageManagement;