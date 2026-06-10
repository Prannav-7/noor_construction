import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import TypewriterText from './TypewriterText';

export default function ProjectsVault({ 
  setSelectedProject, 
  setAllocationModal 
}) {
  const projectsData = {
    r1: {
      id: 'r1',
      title: 'Noor Luminosity',
      tagline: 'Eco-Living Smart Villas',
      location: 'ECR, Pudupattinam',
      progress: 88,
      specifications: {
        sqFt: '3,800 Avg',
        solarCapacity: '12.5 kWp',
        carbonReduction: '4.8 Tons/Yr',
        smartIndex: '95/100'
      },
      image: '/rough_coastal_villa.png',
      features: ['BIM Blueprint Twin', 'Greywater Grid', 'Holographic Controls', 'Off-Grid Backup']
    },
    r2: {
      id: 'r2',
      title: 'Nova Smart Homes',
      tagline: 'High-Density Decarbonized Living',
      location: 'Kalpakkam, Dhawood Nagar',
      progress: 100,
      specifications: {
        sqFt: '1,850 Avg',
        solarCapacity: '6.2 kWp',
        carbonReduction: '2.9 Tons/Yr',
        smartIndex: '90/100'
      },
      image: '/rough_smart_home.png',
      features: ['Smart Glass Facade', 'Micro-Ventilation', 'On-Chain Deed Registry', 'App Mesh Network']
    },
    c1: {
      id: 'c1',
      title: 'Tech-Helix Park',
      tagline: 'Next-Gen Commercial Corporate Park',
      location: 'East Coast Rd Highway',
      progress: 42,
      specifications: {
        sqFt: '185,000 Total',
        solarCapacity: '250 kWp',
        carbonReduction: '180 Tons/Yr',
        smartIndex: '98/100'
      },
      image: '/rough_tech_park.png',
      features: ['Parametric White Concrete', 'Pneumatic Waste Grid', 'Dynamic Sun Shading', 'Tokenized Lease Registry']
    },
    co1: {
      id: 'co1',
      title: 'Oceanic Horizon',
      tagline: 'Off-Grid Coastal Net-Zero Villa',
      location: 'Meiyur Coastal Stretch',
      progress: 65,
      specifications: {
        sqFt: '5,200',
        solarCapacity: '22 kWp',
        carbonReduction: '9.2 Tons/Yr',
        smartIndex: '97/100'
      },
      image: '/rough_coastal_villa.png',
      features: ['Sea-Breeze Geo Cooling', 'Tidal Energy Micro-Hook', 'Structural Health Sensors', 'Self-Healing Bio Concrete']
    }
  };

  const handleInquiry = (project) => {
    setSelectedProject(project);
    setAllocationModal(true);
  };

  // Helper component for construction progress bar
  const ProgressBar = ({ progress }) => (
    <div className="mt-2">
      <div className="flex justify-between font-mono text-[8px] text-neutral-400 tracking-widest mb-0.5">
        <span>CONSTRUCTION</span>
        <span className="text-neutral-700 font-bold">{progress}%</span>
      </div>
      <div className="progress-bar-construction">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="border-t border-black/5 h-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full">
        
        {/* Left Column - Vibrant Orange Block */}
        <div className="lg:col-span-4 bg-[#ff4e00] text-white p-8 md:p-12 flex flex-col justify-between min-h-[450px] lg:min-h-full relative overflow-hidden rebar-pattern">
          
          {/* Header */}
          <div className="relative z-10">
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#4c1300] leading-none mb-1">
              NOOR
            </h2>
            <h2 className="font-serif italic font-normal text-4xl md:text-5xl text-[#4c1300] leading-none">
              works.
            </h2>
          </div>

          {/* Description */}
          <div className="my-10 relative z-10">
            <p className="font-sans font-bold text-base md:text-lg leading-relaxed text-white max-w-sm">
              A curated collection of smart residential complexes, commercial IT parks, and luxury net-zero coastal villas along the East Coast Road, Tamil Nadu. Each project integrates centimeter-accurate digital twins and smart grid systems.
            </p>
          </div>

          {/* Construction Stats */}
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="px-3 py-1.5 border border-white/30 rounded font-mono text-[9px] tracking-widest">
              4 ACTIVE SITES
            </div>
            <div className="px-3 py-1.5 border border-white/30 rounded font-mono text-[9px] tracking-widest">
              12 ENGINEERS
            </div>
          </div>

          {/* Footer arrow button see-more */}
          <div 
            onClick={() => handleInquiry(null)}
            className="flex items-center gap-4 group font-mono text-[11px] font-bold tracking-widest text-white uppercase w-fit cursor-pointer relative z-10"
          >
            <span>See more</span>
            <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Right Column - Staggered 3x3 Chessboard Layout */}
        <div className="lg:col-span-8 bg-[#faf9f6] p-4 sm:p-6 lg:p-8 relative overflow-hidden flex items-center justify-center h-full concrete-texture">
          
          {/* Blinds Shadow Overlay */}
          <div className="window-shadow-overlay absolute inset-0"></div>

          {/* Staggered Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 w-full max-w-[850px] relative z-10 font-sans">
            
            {/* Row 1, Col 1: Project 1 Image — with pin mark */}
            <div 
              onClick={() => handleInquiry(projectsData.r1)}
              className="aspect-square w-full bg-neutral-100 overflow-hidden border border-black/5 group cursor-pointer pin-mark relative"
            >
              <img 
                src={projectsData.r1.image} 
                alt={projectsData.r1.title} 
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 opacity-95"
              />
            </div>

            {/* Row 1, Col 2: Project 1 Specs Text */}
            <div 
              onClick={() => handleInquiry(projectsData.r1)}
              className="flex flex-col justify-center p-4 border border-transparent hover:border-black/10 hover:bg-white transition-all cursor-pointer"
            >
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest mb-1.5 uppercase font-semibold border-b border-dashed border-neutral-300 pb-1 inline-block">// RESIDENTIAL_VILLAS</span>
              <h4 className="font-display font-extrabold text-sm text-black uppercase tracking-tight mb-2">{projectsData.r1.title}</h4>
              <p className="text-neutral-600 text-[11px] leading-relaxed font-medium">
                {projectsData.r1.specifications.sqFt} footprint. Sustainable coastal residential villas with {projectsData.r1.specifications.solarCapacity} solar setup.
              </p>
              <ProgressBar progress={projectsData.r1.progress} />
            </div>

            {/* Row 1, Col 3: Project 2 Image — with pin mark + COMPLETED ribbon */}
            <div 
              onClick={() => handleInquiry(projectsData.r2)}
              className="aspect-square w-full bg-neutral-100 overflow-hidden border border-black/5 group cursor-pointer pin-mark relative"
            >
              <img 
                src={projectsData.r2.image} 
                alt={projectsData.r2.title} 
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 opacity-95"
              />
            </div>

            {/* Row 2, Col 1: Project 2 Specs Text */}
            <div 
              onClick={() => handleInquiry(projectsData.r2)}
              className="flex flex-col justify-center p-4 border border-transparent hover:border-black/10 hover:bg-white transition-all cursor-pointer"
            >
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest mb-1.5 uppercase font-semibold border-b border-dashed border-neutral-300 pb-1 inline-block">// DECARBON_LIVING</span>
              <h4 className="font-display font-extrabold text-sm text-black uppercase tracking-tight mb-2">{projectsData.r2.title}</h4>
              <p className="text-neutral-600 text-[11px] leading-relaxed font-medium">
                {projectsData.r2.specifications.sqFt} smart homes. Eco-concrete builds located in Kalpakkam.
              </p>
              <ProgressBar progress={projectsData.r2.progress} />
            </div>

            {/* Row 2, Col 2: Project 3 Image — with pin mark + under construction */}
            <div 
              onClick={() => handleInquiry(projectsData.c1)}
              className="aspect-square w-full bg-neutral-100 overflow-hidden border border-black/5 group cursor-pointer pin-mark relative"
            >
              <img 
                src={projectsData.c1.image} 
                alt={projectsData.c1.title} 
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 opacity-95"
              />
              {/* Under Construction Ribbon */}
              <div className="under-construction-ribbon">IN PROGRESS</div>
            </div>

            {/* Row 2, Col 3: Project 3 Specs Text */}
            <div 
              onClick={() => handleInquiry(projectsData.c1)}
              className="flex flex-col justify-center p-4 border border-transparent hover:border-black/10 hover:bg-white transition-all cursor-pointer"
            >
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest mb-1.5 uppercase font-semibold border-b border-dashed border-neutral-300 pb-1 inline-block">// CORPORATE_PARK</span>
              <h4 className="font-display font-extrabold text-sm text-black uppercase tracking-tight mb-2">{projectsData.c1.title}</h4>
              <p className="text-neutral-600 text-[11px] leading-relaxed font-medium">
                {projectsData.c1.specifications.sqFt} parametric commercial hub featuring sun shading.
              </p>
              <ProgressBar progress={projectsData.c1.progress} />
            </div>

            {/* Row 3, Col 1: Telemetry HUD */}
            <div className="flex flex-col justify-between p-4 font-mono text-[11px] border border-black/5 bg-white">
              <span className="text-neutral-500 tracking-widest font-semibold">// TELEMETRY_HUD</span>
              <div className="space-y-1 text-[10px] text-neutral-600 mt-4 leading-normal font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-neutral-400"></span>
                  <TypewriterText words="BIM STABILIZED: 100%" speed={50} loop={false} cursor={true} delay={50000} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-neutral-400"></span>
                  <TypewriterText words="ECR SYSTEM: SECURE" speed={55} loop={false} cursor={true} delay={50000} />
                </div>
              </div>
              {/* Construction tape divider */}
              <div className="construction-tape w-full mt-3"></div>
            </div>

            {/* Row 3, Col 2: Project 4 Specs Text */}
            <div 
              onClick={() => handleInquiry(projectsData.co1)}
              className="flex flex-col justify-center p-4 border border-transparent hover:border-black/10 hover:bg-white transition-all cursor-pointer"
            >
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest mb-1.5 uppercase font-semibold border-b border-dashed border-neutral-300 pb-1 inline-block">// NET_ZERO_COASTAL</span>
              <h4 className="font-display font-extrabold text-sm text-black uppercase tracking-tight mb-2">{projectsData.co1.title}</h4>
              <p className="text-neutral-600 text-[11px] leading-relaxed font-medium">
                {projectsData.co1.specifications.sqFt} off-grid coastal haven with bio-concrete and tidal setup.
              </p>
              <ProgressBar progress={projectsData.co1.progress} />
            </div>

            {/* Row 3, Col 3: Project 4 Image — with under construction ribbon */}
            <div 
              onClick={() => handleInquiry(projectsData.co1)}
              className="aspect-square w-full bg-neutral-100 overflow-hidden border border-black/5 group cursor-pointer pin-mark relative"
            >
              <img 
                src={projectsData.co1.image} 
                alt={projectsData.co1.title} 
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 opacity-95"
              />
              {/* Under Construction Ribbon */}
              <div className="under-construction-ribbon">IN PROGRESS</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
