// Central projects data — used by App.jsx, Projects.jsx, Carousel.jsx, and ProjectDetail.jsx

export const ALL_PROJECTS = [
  {
    id: 'r1',
    category: 'residential',
    title: 'Noor Luminosity Smart Villas',
    tagline: 'Futuristic Eco-Living Ecosystem',
    location: 'East Coast Road, Pudupattinam',
    progress: 88,
    year: '2025',
    area: '3,800 sqft',
    specifications: {
      sqFt: '3,800 Avg',
      solarCapacity: '12.5 kWp',
      carbonReduction: '4.8 Tons/Yr',
      smartIndex: '95/100'
    },
    image: '/local_villa_project.png',
    features: [
      { title: 'BIM Blueprint Twin', desc: 'Millimeter-accurate 3D digital model of the structure for seamless pre-planning.' },
      { title: 'Greywater Grid', desc: 'Advanced filtration system recycling sink and shower water for irrigation.' },
      { title: 'Holographic Controls', desc: 'Next-gen smart home panels with intuitive gesture-based climate control.' },
      { title: 'Off-Grid Backup', desc: 'High-capacity solar wall batteries ensuring zero power interruptions.' }
    ],
    description:
      'A premium eco-smart villa development along East Coast Road featuring solar-integrated rooftops, intelligent water management, and a BIM digital twin for full lifecycle monitoring. Built with M25-grade concrete and corrosion-resistant TMT steel. Each villa offers an average of 3,800 sq ft of luxurious, sustainable living space designed for the discerning homeowner.'
  },
  {
    id: 'r2',
    category: 'residential',
    title: 'Nova Apex Smart Homes',
    tagline: 'High-Density Decarbonized Living',
    location: 'Kalpakkam, Dhawood Nagar',
    progress: 100,
    year: '2024',
    area: '1,850 sqft',
    specifications: {
      sqFt: '1,850 Avg',
      solarCapacity: '6.2 kWp',
      carbonReduction: '2.9 Tons/Yr',
      smartIndex: '90/100'
    },
    image: '/local_smart_home.png',
    features: [
      { title: 'Smart Glass Facade', desc: 'Electrochromic glass that dynamically tints based on sunlight intensity.' },
      { title: 'Micro-Ventilation', desc: 'Sensor-driven passive airflow system to maintain clean indoor air quality.' },
      { title: 'On-Chain Deed Registry', desc: 'Tamper-proof ownership deeds stored securely on a digital ledger.' },
      { title: 'App Mesh Network', desc: 'Low-latency local smart home connectivity independent of the internet.' }
    ],
    description:
      'A completed smart residential project in Kalpakkam with automated climate control, app-based access management, and energy-efficient smart glass facades. Fully handed over to all owners with a zero-snagging certificate. The on-chain deed registry ensures tamper-proof property ownership records for every resident.'
  },
  {
    id: 'r3',
    category: 'residential',
    title: 'Greenwood Duplex Homes',
    tagline: 'Twin-Unit Modern Living',
    location: 'Maraimalai Nagar, Chennai',
    progress: 72,
    year: '2026',
    area: '2,200 sqft each',
    specifications: {
      sqFt: '2,200 Per Unit',
      solarCapacity: '4.8 kWp',
      carbonReduction: '2.1 Tons/Yr',
      smartIndex: '85/100'
    },
    image: '/local_duplex_house.png',
    features: [
      { title: 'Twin-Unit Layout', desc: 'Optimized duplex footprint maximizing square footage and privacy for both homes.' },
      { title: 'Shared Solar Array', desc: 'Rooftop solar generator delivering clean energy to both family units.' },
      { title: 'Rain Harvesting', desc: 'High-capacity filtration channels collecting and storing rainwater runoff.' },
      { title: 'EV Charging Point', desc: 'Dedicated fast-charging stations integrated into the carports.' }
    ],
    description:
      'Thoughtfully designed duplex units in Maraimalai Nagar sharing a solar array and rainwater harvesting system. Each unit features independent access, a private garden, and dedicated EV charging infrastructure. Ideal for joint families or as a rental investment property generating passive income.'
  },
  {
    id: 'c1',
    category: 'commercial',
    title: 'Noor Tech-Helix Corporate Park',
    tagline: 'Next-Gen Commercial Nexus',
    location: 'East Coast Rd Highway',
    progress: 42,
    year: '2027',
    area: '185,000 sqft',
    specifications: {
      sqFt: '185,000 Total',
      solarCapacity: '250 kWp',
      carbonReduction: '180 Tons/Yr',
      smartIndex: '98/100'
    },
    image: '/local_tech_office.png',
    features: [
      { title: 'Parametric Concrete', desc: 'Digitally fabricated concrete structures for enhanced load durability.' },
      { title: 'Pneumatic Waste Grid', desc: 'Underground high-speed tubes transporting waste cleanly to disposal.' },
      { title: 'Dynamic Sun Shading', desc: 'Motorized solar louvers that rotate automatically to block harsh glare.' },
      { title: 'Tokenized Lease Registry', desc: 'Smart contract-based leasing for transparent commercial occupancy.' }
    ],
    description:
      'A landmark commercial development on the ECR Highway featuring parametric structural design, automated pneumatic waste management, and dynamic external sun-shading louvers. Targeting LEED Platinum certification upon completion in 2027. The tokenized lease registry provides full digital transparency for all commercial tenants.'
  },
  {
    id: 'c2',
    category: 'commercial',
    title: 'Sunrise Apartment Block',
    tagline: 'Urban Vertical Living',
    location: 'Potheri, SRM Road',
    progress: 55,
    year: '2026',
    area: '24,000 sqft',
    specifications: {
      sqFt: '24,000 Total',
      solarCapacity: '18 kWp',
      carbonReduction: '8.5 Tons/Yr',
      smartIndex: '88/100'
    },
    image: '/local_apartment_construction.png',
    features: [
      { title: 'Fly Ash Blocks', desc: 'High-insulation, eco-friendly bricks made from industrial byproduct.' },
      { title: 'Common Solar Roof', desc: 'Large rooftop solar grid providing electricity to all common areas.' },
      { title: 'CCTV Grid', desc: 'AI-assisted camera system monitoring entry points and common areas 24/7.' },
      { title: 'Fire Suppression System', desc: 'Integrated sprinkler grids and smoke detectors on every floor.' }
    ],
    description:
      'A 4-storey residential apartment block at Potheri with 12 units across G+3 floors. Built with eco-friendly fly ash bricks and a common solar rooftop system. The project serves the growing student and working professional community near SRM University, providing affordable modern urban housing with full safety systems.'
  },
  {
    id: 'co1',
    category: 'coastal',
    title: 'Oceanic Horizon Net-Zero Villa',
    tagline: 'Off-Grid Luxury Haven',
    location: 'Meiyur Coastal Stretch',
    progress: 65,
    year: '2026',
    area: '5,200 sqft',
    specifications: {
      sqFt: '5,200',
      solarCapacity: '22 kWp',
      carbonReduction: '9.2 Tons/Yr',
      smartIndex: '97/100'
    },
    image: '/local_coastal_home.png',
    features: [
      { title: 'Sea-Breeze Geo Cooling', desc: 'Sub-ground tunnels cooling incoming ocean air naturally.' },
      { title: 'Tidal Energy Micro-Hook', desc: 'Micro-generator capturing shore wave kinetic energy for power.' },
      { title: 'Structural Health Sensors', desc: 'Embedded telemetry monitors checking building integrity continuously.' },
      { title: 'Self-Healing Bio Concrete', desc: 'Special concrete mix that heals micro-cracks upon moisture contact.' }
    ],
    description:
      'An off-grid coastal villa on the Meiyur Coastal Stretch, engineered for marine-grade durability against sea salt, humidity, and monsoon winds. Features self-healing bio-concrete for corrosion resistance, real-time structural health monitoring via IoT sensors, and a tidal micro-energy hook for 24/7 renewable power independence.'
  }
];

// Grouped by category for the Projects section
export const PROJECTS_BY_CATEGORY = {
  residential: ALL_PROJECTS.filter(p => p.category === 'residential'),
  commercial:  ALL_PROJECTS.filter(p => p.category === 'commercial'),
  coastal:     ALL_PROJECTS.filter(p => p.category === 'coastal'),
};
