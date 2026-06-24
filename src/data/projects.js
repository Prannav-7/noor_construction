// Central projects data — used by App.jsx, Projects.jsx, Carousel.jsx, and ProjectDetail.jsx

export const ALL_PROJECTS = [
  {
    id: 'r1',
    category: 'residential',
    title: 'Noor Luminosity Villas',
    tagline: 'Beautiful & Smart Living',
    location: 'East Coast Road, Pudupattinam',
    progress: 88,
    year: '2025',
    area: '3,800 sqft',
    specifications: {
      type: '4 BHK Luxury Villa',
      area: '3,800 Sq.Ft',
      facing: 'East Facing',
      parking: '2 Covered Cars'
    },
    image: '/local_villa_project.png',
    features: [
      { title: '3D Home Preview', desc: 'See exactly how your home will look before we even start building.' },
      { title: 'Water Saving System', desc: 'Recycles shower and sink water to keep your garden green.' },
      { title: 'Smart Home Controls', desc: 'Turn on lights and AC easily from your smartphone.' },
      { title: '24/7 Power Backup', desc: 'Big solar batteries ensure you never have a power cut.' }
    ],
    description:
      'A beautiful luxury villa built on the East Coast Road. We used strong DMD Fe-550 steel and Pure Verified M-Sand for a solid, safe foundation. We also designed and built the complete interior woodwork, modular kitchen, and modern furnishings so the house is fully ready to move in.'
  },
  {
    id: 'r2',
    category: 'residential',
    title: 'Nova Apex Smart Homes',
    tagline: 'Modern & Comfortable Homes',
    location: 'Kalpakkam, Dhawood Nagar',
    progress: 100,
    year: '2024',
    area: '1,850 sqft',
    specifications: {
      type: '3 BHK Smart Home',
      area: '1,850 Sq.Ft',
      facing: 'North Facing',
      parking: '1 Covered Car'
    },
    image: '/local_smart_home.png',
    features: [
      { title: 'Smart Windows', desc: 'Windows that naturally darken to keep the house cool in summer.' },
      { title: 'Fresh Air System', desc: 'Automatically brings in clean, fresh air so the house never feels stuffy.' },
      { title: 'Secure Documents', desc: 'Your house papers are safely stored digitally so they can never be lost.' },
      { title: 'Strong Wi-Fi', desc: 'Fast and smooth internet connection in every corner of the house.' }
    ],
    description:
      'A completed smart home project in Kalpakkam built using top-quality Ultratech OPC 53 cement and Pure Verified M-Sand. We handled the complete construction and the beautiful interior woodwork, cupboards, and lighting. Everything is ready and perfectly finished for the families living there.'
  },
  {
    id: 'r3',
    category: 'residential',
    title: 'Greenwood Duplex Homes',
    tagline: 'Spacious Twin Homes',
    location: 'Maraimalai Nagar, Chennai',
    progress: 72,
    year: '2026',
    area: '2,200 sqft each',
    specifications: {
      type: '4 BHK Duplex',
      area: '2,200 Sq.Ft',
      facing: 'East Facing',
      parking: '2 Car Parking'
    },
    image: '/local_duplex_house.png',
    features: [
      { title: 'Smart Floor Plan', desc: 'Designed so both families have plenty of space and privacy.' },
      { title: 'Shared Solar Power', desc: 'Rooftop solar panels that provide free, clean electricity to both homes.' },
      { title: 'Rainwater Saving', desc: 'Collects rainwater safely to help keep the groundwater levels high.' },
      { title: 'Car Charging Port', desc: 'Dedicated fast charging points for your electric cars.' }
    ],
    description:
      'Two beautiful duplex homes in Maraimalai Nagar. Built with trusted DMD Fe-550 steel, they are incredibly strong and safe. We also completely finished the inside of the homes with custom wardrobes, TV units, and stylish interior decoration tailored perfectly for both families.'
  },
  {
    id: 'c1',
    category: 'commercial',
    title: 'Noor Tech Corporate Park',
    tagline: 'Modern Office Space',
    location: 'East Coast Rd Highway',
    progress: 42,
    year: '2027',
    area: '185,000 sqft',
    specifications: {
      type: 'Commercial Office',
      area: '185,000 Sq.Ft',
      facing: 'North-East Facing',
      parking: '250+ Cars'
    },
    image: '/local_tech_office.png',
    features: [
      { title: 'Extra Strong Pillars', desc: 'Special concrete design to hold the weight of a large office easily.' },
      { title: 'Clean Waste System', desc: 'Hidden tubes that take away office waste quickly and cleanly.' },
      { title: 'Automatic Sun Shades', desc: 'Window covers that move on their own to block hot sunlight.' },
      { title: 'Easy Digital Renting', desc: 'Simple, clear digital agreements for anyone renting an office space.' }
    ],
    description:
      'A large, modern office building on the ECR Highway. Constructed with heavy-duty Fe-550 steel and premium ACC cement for maximum safety. The project also includes full interior outfitting — from elegant glass cabins and comfortable workstations to beautiful, welcoming reception areas.'
  },
  {
    id: 'c2',
    category: 'commercial',
    title: 'Sunrise Apartment Block',
    tagline: 'Safe & Beautiful Flats',
    location: 'Potheri, SRM Road',
    progress: 55,
    year: '2026',
    area: '24,000 sqft',
    specifications: {
      type: '2 & 3 BHK Flats',
      area: '1,200 Sq.Ft Avg',
      facing: 'North & East',
      parking: 'Stilt Parking'
    },
    image: '/local_apartment_construction.png',
    features: [
      { title: 'Cooling Bricks', desc: 'Special bricks that keep the apartments cool and save on AC bills.' },
      { title: 'Free Common Power', desc: 'Solar panels on the roof run the lift and staircase lights for free.' },
      { title: '24/7 Security Cameras', desc: 'Cameras at all doors and hallways so your family is always safe.' },
      { title: 'Fire Safety', desc: 'Smoke detectors and water sprinklers installed on every single floor.' }
    ],
    description:
      'A strong 4-story apartment building in Potheri with 12 homes. Built with top-grade cement and verified clean M-Sand. We provided complete interior services for all flats, including modern modular kitchens, elegant ceiling lighting, and custom-fitted wooden wardrobes.'
  },
  {
    id: 'co1',
    category: 'coastal',
    title: 'Oceanic Beach Villa',
    tagline: 'Luxury Seaside Home',
    location: 'Meiyur Coastal Stretch',
    progress: 65,
    year: '2026',
    area: '5,200 sqft',
    specifications: {
      type: '5 BHK Beach Villa',
      area: '5,200 Sq.Ft',
      facing: 'Sea Facing (East)',
      parking: '3 Covered Cars'
    },
    image: '/local_coastal_home.png',
    features: [
      { title: 'Natural Cooling', desc: 'Underground pipes that use cool ocean air to keep the house chill.' },
      { title: 'Ocean Power', desc: 'A small machine that makes free electricity from the ocean waves.' },
      { title: 'Safety Sensors', desc: 'Smart sensors hidden in the walls that make sure the house stays strong.' },
      { title: 'Magic Concrete', desc: 'Special cement that automatically fixes tiny cracks when it gets wet.' }
    ],
    description:
      'A luxury beach house on the Meiyur coast. Because it is near the sea, we used special rust-proof steel and sea-safe cement to protect it from the salt air. The inside is beautifully furnished with high-end interior woodwork, luxury bathrooms, and modern decor, providing the ultimate relaxing getaway.'
  }
];

// Grouped by category for the Projects section
export const PROJECTS_BY_CATEGORY = {
  residential: ALL_PROJECTS.filter(p => p.category === 'residential'),
  commercial:  ALL_PROJECTS.filter(p => p.category === 'commercial'),
  coastal:     ALL_PROJECTS.filter(p => p.category === 'coastal'),
};
