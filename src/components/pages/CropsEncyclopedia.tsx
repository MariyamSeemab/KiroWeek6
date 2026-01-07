import React, { useState } from 'react';
import { CropType } from '../../types/storage';

const CropsEncyclopedia: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const cropsData: (CropType & { 
    description: string;
    scientificName: string;
    family: string;
    origin: string;
    growingSeason: string;
    waterRequirement: string;
    soilType: string;
    temperature: string;
    harvestTime: string;
    nutritionalValue: string[];
    uses: string[];
    diseases: string[];
    pests: string[];
    storageInfo: string;
  })[] = [
    {
      id: 'wheat',
      name: 'Wheat',
      icon: '🌾',
      marketPrice: 2500,
      spoilageRate: { coldStorage: 0.02, solarDrying: 0.08 },
      description: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. It is one of the most important cereal crops and provides more nourishment for humans than any other food source.',
      scientificName: 'Triticum aestivum',
      family: 'Poaceae (Grass family)',
      origin: 'Fertile Crescent (modern-day Middle East)',
      growingSeason: 'Rabi (Winter) - October to April',
      waterRequirement: 'Medium (450-650mm annually)',
      soilType: 'Well-drained loamy soil, pH 6.0-7.5',
      temperature: '15-25°C during growing season',
      harvestTime: 'March-May (depending on variety)',
      nutritionalValue: ['Carbohydrates: 71g/100g', 'Protein: 13g/100g', 'Fiber: 13g/100g', 'Iron: 3.6mg/100g'],
      uses: ['Flour production', 'Bread making', 'Pasta', 'Animal feed', 'Biofuel'],
      diseases: ['Rust', 'Smut', 'Blight', 'Powdery mildew'],
      pests: ['Aphids', 'Armyworm', 'Termites', 'Rodents'],
      storageInfo: 'Store in cool, dry conditions. Moisture content should be below 14% for safe storage.'
    },
    {
      id: 'rice',
      name: 'Rice',
      icon: '🍚',
      marketPrice: 2200,
      spoilageRate: { coldStorage: 0.015, solarDrying: 0.06 },
      description: 'Rice is the seed of the grass species Oryza sativa or Oryza glaberrima. It is the most widely consumed staple food for a large part of the world\'s human population, especially in Asia.',
      scientificName: 'Oryza sativa',
      family: 'Poaceae (Grass family)',
      origin: 'China and India',
      growingSeason: 'Kharif (Monsoon) - June to November',
      waterRequirement: 'High (1200-2500mm annually)',
      soilType: 'Clay loam, pH 5.5-6.5',
      temperature: '20-35°C during growing season',
      harvestTime: 'September-December',
      nutritionalValue: ['Carbohydrates: 80g/100g', 'Protein: 7g/100g', 'Fat: 0.7g/100g', 'Fiber: 1.3g/100g'],
      uses: ['Staple food', 'Rice wine', 'Rice paper', 'Animal feed', 'Industrial starch'],
      diseases: ['Blast', 'Bacterial blight', 'Sheath blight', 'Brown spot'],
      pests: ['Rice stem borer', 'Brown planthopper', 'Rice weevil', 'Rats'],
      storageInfo: 'Store at 12-14% moisture content in airtight containers to prevent insect infestation.'
    },
    {
      id: 'corn',
      name: 'Corn (Maize)',
      icon: '🌽',
      marketPrice: 1800,
      spoilageRate: { coldStorage: 0.025, solarDrying: 0.09 },
      description: 'Corn, also known as maize, is a cereal grain first domesticated by indigenous peoples in southern Mexico. It is now a staple food in many parts of the world and is used for both human consumption and animal feed.',
      scientificName: 'Zea mays',
      family: 'Poaceae (Grass family)',
      origin: 'Central Mexico',
      growingSeason: 'Kharif (Monsoon) - June to October',
      waterRequirement: 'Medium to High (500-800mm)',
      soilType: 'Well-drained fertile soil, pH 6.0-6.8',
      temperature: '21-27°C during growing season',
      harvestTime: 'September-November',
      nutritionalValue: ['Carbohydrates: 74g/100g', 'Protein: 9g/100g', 'Fat: 4.7g/100g', 'Fiber: 7g/100g'],
      uses: ['Food grain', 'Animal feed', 'Ethanol production', 'Corn starch', 'High fructose corn syrup'],
      diseases: ['Corn smut', 'Gray leaf spot', 'Northern corn leaf blight', 'Ear rot'],
      pests: ['Corn borer', 'Fall armyworm', 'Corn rootworm', 'Cutworms'],
      storageInfo: 'Dry to 14% moisture content. Store in ventilated bins to prevent mold and mycotoxin development.'
    },
    {
      id: 'chili',
      name: 'Chili Pepper',
      icon: '🌶️',
      marketPrice: 8000,
      spoilageRate: { coldStorage: 0.03, solarDrying: 0.12 },
      description: 'Chili peppers are varieties of the berry-fruit of plants from the genus Capsicum. They are widely used in many cuisines as a spice to add heat to dishes and are also used for medicinal purposes.',
      scientificName: 'Capsicum annuum',
      family: 'Solanaceae (Nightshade family)',
      origin: 'Central and South America',
      growingSeason: 'Year-round in tropical regions, Kharif in temperate',
      waterRequirement: 'Medium (600-1250mm annually)',
      soilType: 'Well-drained sandy loam, pH 6.0-7.0',
      temperature: '20-30°C optimal growing temperature',
      harvestTime: '75-90 days after transplanting',
      nutritionalValue: ['Vitamin C: 144mg/100g', 'Vitamin A: 952 IU/100g', 'Capsaicin: Variable', 'Antioxidants: High'],
      uses: ['Spice and seasoning', 'Medicinal purposes', 'Food preservation', 'Pepper spray', 'Ornamental'],
      diseases: ['Anthracnose', 'Bacterial spot', 'Powdery mildew', 'Mosaic virus'],
      pests: ['Aphids', 'Thrips', 'Spider mites', 'Fruit borers'],
      storageInfo: 'Fresh chilies: refrigerate at 7-10°C. Dried chilies: store in airtight containers in cool, dry place.'
    },
    {
      id: 'tomato',
      name: 'Tomato',
      icon: '🍅',
      marketPrice: 3500,
      spoilageRate: { coldStorage: 0.05, solarDrying: 0.15 },
      description: 'The tomato is the edible berry of the plant Solanum lycopersicum. It is a versatile fruit used as a vegetable in cooking, rich in vitamins and antioxidants, particularly lycopene.',
      scientificName: 'Solanum lycopersicum',
      family: 'Solanaceae (Nightshade family)',
      origin: 'South America (Peru and Ecuador)',
      growingSeason: 'Year-round in greenhouses, seasonal outdoors',
      waterRequirement: 'High (400-600mm during growing season)',
      soilType: 'Well-drained fertile soil, pH 6.0-6.8',
      temperature: '18-24°C optimal growing temperature',
      harvestTime: '70-100 days from transplanting',
      nutritionalValue: ['Vitamin C: 14mg/100g', 'Lycopene: 2.6mg/100g', 'Potassium: 237mg/100g', 'Folate: 15mcg/100g'],
      uses: ['Fresh consumption', 'Cooking ingredient', 'Sauces and pastes', 'Juice', 'Canning'],
      diseases: ['Early blight', 'Late blight', 'Fusarium wilt', 'Mosaic virus'],
      pests: ['Hornworms', 'Aphids', 'Whiteflies', 'Cutworms'],
      storageInfo: 'Store ripe tomatoes at room temperature. Green tomatoes can be stored at 12-15°C to ripen slowly.'
    },
    {
      id: 'onion',
      name: 'Onion',
      icon: '🧅',
      marketPrice: 2800,
      spoilageRate: { coldStorage: 0.02, solarDrying: 0.07 },
      description: 'The onion is a vegetable that is the most widely cultivated species of the genus Allium. It is used worldwide as a seasoning and vegetable, known for its pungent flavor and numerous health benefits.',
      scientificName: 'Allium cepa',
      family: 'Amaryllidaceae (Amaryllis family)',
      origin: 'Central Asia',
      growingSeason: 'Rabi (Winter) - October to March',
      waterRequirement: 'Medium (350-550mm)',
      soilType: 'Well-drained sandy loam, pH 6.0-7.5',
      temperature: '15-25°C during bulb development',
      harvestTime: 'March-May',
      nutritionalValue: ['Vitamin C: 7.4mg/100g', 'Quercetin: High', 'Sulfur compounds: Variable', 'Fiber: 1.7g/100g'],
      uses: ['Culinary seasoning', 'Medicinal purposes', 'Food preservation', 'Industrial processing'],
      diseases: ['Purple blotch', 'Downy mildew', 'Basal rot', 'Smut'],
      pests: ['Onion thrips', 'Onion maggot', 'Cutworms', 'Nematodes'],
      storageInfo: 'Cure properly after harvest. Store in well-ventilated, dry conditions at 0-4°C with 65-70% humidity.'
    },
    {
      id: 'potato',
      name: 'Potato',
      icon: '🥔',
      marketPrice: 1500,
      spoilageRate: { coldStorage: 0.01, solarDrying: 0.05 },
      description: 'The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. It is the world\'s fourth-largest food crop, following maize, wheat, and rice.',
      scientificName: 'Solanum tuberosum',
      family: 'Solanaceae (Nightshade family)',
      origin: 'Andes Mountains of South America',
      growingSeason: 'Rabi (Winter) - October to February',
      waterRequirement: 'Medium (500-700mm)',
      soilType: 'Well-drained sandy loam, pH 5.0-6.0',
      temperature: '15-20°C optimal growing temperature',
      harvestTime: '90-120 days after planting',
      nutritionalValue: ['Carbohydrates: 17g/100g', 'Vitamin C: 20mg/100g', 'Potassium: 421mg/100g', 'Fiber: 2.2g/100g'],
      uses: ['Staple food', 'French fries', 'Chips', 'Starch production', 'Alcohol production'],
      diseases: ['Late blight', 'Early blight', 'Scab', 'Blackleg'],
      pests: ['Colorado potato beetle', 'Aphids', 'Wireworms', 'Tuber moths'],
      storageInfo: 'Store at 4-10°C in dark, well-ventilated conditions. Avoid light exposure to prevent greening.'
    },
    {
      id: 'soybean',
      name: 'Soybean',
      icon: '🫘',
      marketPrice: 4200,
      spoilageRate: { coldStorage: 0.02, solarDrying: 0.08 },
      description: 'The soybean is a species of legume native to East Asia, widely grown for its edible bean. It is a complete protein source and is used for food, animal feed, and industrial purposes.',
      scientificName: 'Glycine max',
      family: 'Fabaceae (Legume family)',
      origin: 'East Asia (China)',
      growingSeason: 'Kharif (Monsoon) - June to October',
      waterRequirement: 'Medium to High (450-700mm)',
      soilType: 'Well-drained fertile soil, pH 6.0-7.0',
      temperature: '20-30°C during growing season',
      harvestTime: 'September-November',
      nutritionalValue: ['Protein: 36g/100g', 'Fat: 20g/100g', 'Carbohydrates: 30g/100g', 'Isoflavones: High'],
      uses: ['Soy oil', 'Tofu', 'Soy sauce', 'Animal feed', 'Biodiesel'],
      diseases: ['Soybean rust', 'Frogeye leaf spot', 'Sudden death syndrome', 'White mold'],
      pests: ['Soybean aphid', 'Bean leaf beetle', 'Stink bugs', 'Spider mites'],
      storageInfo: 'Dry to 13% moisture content. Store in airtight containers to maintain quality and prevent rancidity.'
    },
    {
      id: 'cotton',
      name: 'Cotton',
      icon: '🌱',
      marketPrice: 5500,
      spoilageRate: { coldStorage: 0.01, solarDrying: 0.04 },
      description: 'Cotton is a soft, fluffy staple fiber that grows in a boll around the seeds of cotton plants. It is primarily composed of cellulose and is the world\'s most important natural fiber.',
      scientificName: 'Gossypium hirsutum',
      family: 'Malvaceae (Mallow family)',
      origin: 'Tropical and subtropical regions worldwide',
      growingSeason: 'Kharif (Monsoon) - May to October',
      waterRequirement: 'High (700-1300mm)',
      soilType: 'Well-drained black cotton soil, pH 5.8-8.0',
      temperature: '21-30°C during growing season',
      harvestTime: 'October-January',
      nutritionalValue: ['Fiber content: 88-96%', 'Cellulose: Primary component', 'Cottonseed oil: Edible', 'Protein: In cottonseed'],
      uses: ['Textile production', 'Cottonseed oil', 'Animal feed', 'Medical supplies', 'Paper production'],
      diseases: ['Bollworm', 'Fusarium wilt', 'Verticillium wilt', 'Bacterial blight'],
      pests: ['Pink bollworm', 'American bollworm', 'Aphids', 'Jassids'],
      storageInfo: 'Store cotton in dry, well-ventilated warehouses. Maintain moisture content below 8% to prevent quality deterioration.'
    },
    {
      id: 'sugarcane',
      name: 'Sugarcane',
      icon: '🎋',
      marketPrice: 3200,
      spoilageRate: { coldStorage: 0.08, solarDrying: 0.20 },
      description: 'Sugarcane is a tropical grass that is primarily grown for sugar production. It is also used for ethanol production and as a source of biofuel, making it an important cash crop.',
      scientificName: 'Saccharum officinarum',
      family: 'Poaceae (Grass family)',
      origin: 'New Guinea and Southeast Asia',
      growingSeason: 'Annual crop, planted February-March',
      waterRequirement: 'Very High (1500-2500mm annually)',
      soilType: 'Deep, fertile, well-drained soil, pH 6.5-7.5',
      temperature: '26-32°C optimal growing temperature',
      harvestTime: '12-18 months after planting',
      nutritionalValue: ['Sucrose: 14-18%', 'Fiber: 11-16%', 'Water: 73-76%', 'Minerals: 0.4-0.8%'],
      uses: ['Sugar production', 'Ethanol/biofuel', 'Bagasse for paper', 'Molasses', 'Electricity generation'],
      diseases: ['Red rot', 'Smut', 'Wilt', 'Mosaic virus'],
      pests: ['Shoot borer', 'Root borer', 'Scale insects', 'Termites'],
      storageInfo: 'Process immediately after harvest. Cannot be stored for long periods due to rapid sucrose loss and deterioration.'
    }
  ];

  const filteredCrops = cropsData.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCrop) {
    return (
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => setSelectedCrop(null)}
          className="mb-6 flex items-center space-x-2 text-gold hover:text-yellow-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Crops Encyclopedia</span>
        </button>

        {/* Crop Detail Page */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
            <div className="flex items-center space-x-4">
              <span className="text-6xl">{selectedCrop.icon}</span>
              <div>
                <h1 className="text-4xl font-bold">{selectedCrop.name}</h1>
                <p className="text-xl italic">{selectedCrop.scientificName}</p>
                <p className="text-lg">{selectedCrop.family}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <section className="mb-8">
              <p className="text-lg text-slate-700 leading-relaxed">{selectedCrop.description}</p>
            </section>

            {/* Quick Facts */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Quick Facts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Origin</h3>
                  <p className="text-slate-600">{selectedCrop.origin}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Growing Season</h3>
                  <p className="text-slate-600">{selectedCrop.growingSeason}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Market Price</h3>
                  <p className="text-slate-600">₹{selectedCrop.marketPrice}/quintal</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Water Requirement</h3>
                  <p className="text-slate-600">{selectedCrop.waterRequirement}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Soil Type</h3>
                  <p className="text-slate-600">{selectedCrop.soilType}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-700">Temperature</h3>
                  <p className="text-slate-600">{selectedCrop.temperature}</p>
                </div>
              </div>
            </section>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Nutritional Value */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Nutritional Value</h2>
                <ul className="space-y-2">
                  {selectedCrop.nutritionalValue.map((nutrient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-slate-700">{nutrient}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Uses */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Uses</h2>
                <ul className="space-y-2">
                  {selectedCrop.uses.map((use, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-slate-700">{use}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Diseases */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Common Diseases</h2>
                <ul className="space-y-2">
                  {selectedCrop.diseases.map((disease, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-slate-700">{disease}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Pests */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Common Pests</h2>
                <ul className="space-y-2">
                  {selectedCrop.pests.map((pest, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-slate-700">{pest}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Storage Information */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gold pb-2">Storage Information</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-slate-700">{selectedCrop.storageInfo}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold text-slate-700">Cold Storage Loss</h4>
                    <p className="text-slate-600">{(selectedCrop.spoilageRate.coldStorage * 100).toFixed(1)}%</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-semibold text-slate-700">Solar Drying Loss</h4>
                    <p className="text-slate-600">{(selectedCrop.spoilageRate.solarDrying * 100).toFixed(1)}%</p>
                  </div>
                </div>
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Crops Encyclopedia</h1>
        <p className="text-slate-600">Comprehensive information about agricultural crops, their cultivation, and storage requirements</p>
      </header>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search crops by name or scientific name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
          />
          <svg className="absolute left-4 top-4 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => setSelectedCrop(crop)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-slate-200 hover:border-gold"
          >
            <div className="p-6">
              <div className="text-center mb-4">
                <span className="text-5xl">{crop.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">{crop.name}</h3>
              <p className="text-sm text-slate-600 italic text-center mb-4">{crop.scientificName}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Market Price:</span>
                  <span className="text-sm font-semibold text-green-600">₹{crop.marketPrice}/quintal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Family:</span>
                  <span className="text-sm text-slate-700">{crop.family.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Season:</span>
                  <span className="text-sm text-slate-700">{crop.growingSeason.split(' ')[0]}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <button className="w-full text-gold hover:text-yellow-600 font-medium text-sm transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No crops found</h3>
          <p className="text-slate-600">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default CropsEncyclopedia;