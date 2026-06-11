import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Projects from './components/Projects';
import WhyUs from './components/WhyUs';
import SmartHUD from './components/SmartHUD';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import AllocationModal from './components/AllocationModal';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';

function App() {
  // Navigation & Modal States
  const [allocationModal, setAllocationModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Projects Active Tab State
  const [activeTab, setActiveTab] = useState('residential');

  // Interactive Estimator Variables
  const [calculator, setCalculator] = useState({
    package: 'luminosity',
    groundFloor: 1200,
    firstFloor: 1200,
    secondFloor: 0,
    thirdFloor: 0,
    fourthFloor: 0,
    waterSump: 5000,
    septicTank: 3000,
    compoundLength: 120,
    compoundHeight: 6
  });

  const updateCalculator = (key, value) => {
    setCalculator(prev => ({ ...prev, [key]: value }));
  };



  // Live Telemetry IST Clock
  const [timeText, setTimeText] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setTimeText(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Reveal Animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Real Estate Projects Database
  const projects = {
    residential: [
      {
        id: 'r1',
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
        features: ['BIM Blueprint Twin', 'Greywater Grid', 'Holographic Controls', 'Off-Grid Backup'],
        description: 'A premium eco-smart villa development along East Coast Road featuring solar-integrated rooftops, intelligent water management, and a BIM digital twin for full lifecycle monitoring. Built with M25-grade concrete and corrosion-resistant TMT steel.'
      },
      {
        id: 'r2',
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
        features: ['Smart Glass Facade', 'Micro-Ventilation', 'On-Chain Deed Registry', 'App Mesh Network'],
        description: 'A completed smart residential project with automated climate control, app-based access management, and energy-efficient smart glass facades. Fully handed over to owners with zero-snagging certification.'
      },
      {
        id: 'r3',
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
        features: ['Twin-Unit Layout', 'Shared Solar Array', 'Rain Harvesting', 'EV Charging Point'],
        description: 'Thoughtfully designed duplex units sharing a solar array and rainwater harvesting system. Each unit has independent access, private garden, and EV charging infrastructure. Ideal for joint families or rental investment.'
      }
    ],
    commercial: [
      {
        id: 'c1',
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
        features: ['Parametric Concrete', 'Pneumatic Waste Grid', 'Dynamic Sun Shading', 'Tokenized Lease Registry'],
        description: 'A landmark commercial development featuring parametric structural design, automated waste management, and dynamic external sun-shading louvers. Targeting LEED Platinum certification upon completion.'
      },
      {
        id: 'c2',
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
        features: ['Fly Ash Blocks', 'Common Solar Roof', 'CCTV Grid', 'Fire Suppression System'],
        description: 'A 4-storey residential apartment block with 12 units across G+3 floors. Built with eco-friendly fly ash bricks and a common solar rooftop system, the project serves the growing student and working professional community near SRM.'
      }
    ],
    coastal: [
      {
        id: 'co1',
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
        features: ['Sea-Breeze Geo Cooling', 'Tidal Energy Micro-Hook', 'Structural Health Sensors', 'Self-Healing Bio Concrete'],
        description: 'An off-grid coastal villa engineered for marine-grade durability. Features self-healing bio-concrete for salt resistance, real-time structural health monitoring, and a tidal micro-energy hook for 24/7 renewable power independence.'
      }
    ]
  };


  // Client Testimonials
  const reviews = [
    {
      name: "Senthil Kumar",
      role: "Villa Owner at ECR",
      rating: 5,
      comment: "Noor Infrastructure built a masterpiece for our family. The smart home integration — from automated blinds to solar monitoring — is light years ahead of standard builders. Every wall feels engineered, not just constructed.",
      date: "May 2026",
      authTag: "DEED#0924-ECR",
      title: "Noor Luminosity Villas",
      year: "2026",
      image: "/local_villa_project.png",
      details: ["/local_smart_home.png", "/local_tech_office.png", "/local_coastal_home.png", "/local_villa_project.png"]
    },
    {
      name: "Dr. Ananya Ramakrishnan",
      role: "Scientific Consultant at IGCAR",
      rating: 5,
      comment: "The structural precision and eco-concrete choices reflect genuine engineering excellence. Their BIM digital twin let us inspect every beam before it was poured. A builder with true scientific vision.",
      date: "April 2026",
      authTag: "DEED#0714-KAL",
      title: "Nova Apex Smart Homes",
      year: "2026",
      image: "/local_smart_home.png",
      details: ["/local_villa_project.png", "/local_coastal_home.png", "/local_smart_home.png", "/local_tech_office.png"]
    },
    {
      name: "Farhan Dhawood",
      role: "Managing Director, Dhawood Estates",
      rating: 5,
      comment: "The digital twin technology allowed us to walk through our commercial park before a single block was cast. Milestone transparency is unmatched — every rupee tracked, every deadline met.",
      date: "March 2026",
      authTag: "DEED#1102-DHW",
      title: "Tech-Helix Corporate Park",
      year: "2025",
      image: "/local_tech_office.png",
      details: ["/local_coastal_home.png", "/local_villa_project.png", "/local_tech_office.png", "/local_smart_home.png"]
    },
    {
      name: "Sarah Joshua",
      role: "Coastal Resident, Meiyur",
      rating: 5,
      comment: "Building along ECR demands salt resistance and wind-rated structures. Noor's advanced materials and elevated architecture have kept our coastal home pristine through two monsoon seasons.",
      date: "Jan 2026",
      authTag: "DEED#0442-ECR",
      title: "Oceanic Horizon Villa",
      year: "2026",
      image: "/local_coastal_home.png",
      details: ["/local_smart_home.png", "/local_tech_office.png", "/local_coastal_home.png", "/local_villa_project.png"]
    }
  ];

  // Estimator live calculations
  const calculateEstimates = () => {
    const PACKAGES = {
      luminosity: { rate: 4500, label: 'Noor Luminosity Villa Package' },
      nova: { rate: 3800, label: 'Nova Apex Smart Home Package' },
      helix: { rate: 5800, label: 'Tech-Helix Corporate Package' },
      oceanic: { rate: 6500, label: 'Oceanic Horizon Net-Zero Package' }
    };
    const rate = PACKAGES[calculator.package]?.rate || 4500;
    const packageName = PACKAGES[calculator.package]?.label || 'Noor Luminosity Villa Package';

    const floorArea = 
      Number(calculator.groundFloor || 0) +
      Number(calculator.firstFloor || 0) +
      Number(calculator.secondFloor || 0) +
      Number(calculator.thirdFloor || 0) +
      Number(calculator.fourthFloor || 0);

    const floorCost = floorArea * rate;
    const sumpCost = Number(calculator.waterSump || 0) * 24;
    const septicCost = Number(calculator.septicTank || 0) * 24;
    const compoundArea = Number(calculator.compoundLength || 0) * Number(calculator.compoundHeight || 0);
    const compoundCost = compoundArea * 400;

    const totalCost = floorCost + sumpCost + septicCost + compoundCost;

    // Estimates summary
    const baseOffset = floorArea * 0.0015;
    const offsetFactor = calculator.package === 'oceanic' ? 2.5 : calculator.package === 'luminosity' ? 1.8 : 1.1;
    const carbonOffset = baseOffset * offsetFactor;

    const solarGen = (floorArea * 0.005) * (calculator.package === 'oceanic' ? 1.5 : calculator.package === 'luminosity' ? 1.2 : 0.8);

    const baseMonths = calculator.package === 'helix' ? 18 : 10;
    const sizeFactor = floorArea / 2000;
    const timeline = Math.max(6, Math.min(36, Math.round(baseMonths * (0.7 + sizeFactor * 0.3))));

    return {
      cost: (totalCost / 100000).toFixed(2), // in Lakhs
      totalCostInRs: totalCost,
      floorArea,
      carbon: carbonOffset.toFixed(1),
      energy: solarGen.toFixed(1),
      timeline: timeline,
      packageName
    };
  };

  const estimates = calculateEstimates();



  return (
    <div className="tech-grid-container min-h-screen text-[#111115] font-sans selection:bg-black selection:text-white">
      


      {/* Grid Border Ticks */}
      <div className="grid-ticks">
        <div className="tick-mark left-4 top-4"></div>
        <div className="tick-mark-tr right-4 top-4"></div>
        <div className="tick-mark-bl left-4 bottom-4"></div>
        <div className="tick-mark-br right-4 bottom-4"></div>
      </div>

      {/* Header component */}
      <Header 
        setAllocationModal={setAllocationModal} 
      />

      {/* ScrollStack for sections */}
      <ScrollStack useWindowScroll={true} itemDistance={0} baseScale={1} itemScale={0} itemStackDistance={0} stackPosition="1%" scaleEndPosition="0%" blurAmount={0}>
        <ScrollStackItem>
          <Hero 
            timeText={timeText} 
            setAllocationModal={setAllocationModal} 
          />
        </ScrollStackItem>
        <ScrollStackItem>
          <AboutUs />
        </ScrollStackItem>
        <ScrollStackItem itemClassName="overflow-y-auto">
          <Projects projects={projects} />
        </ScrollStackItem>
        <ScrollStackItem data-margin-bottom="85vh">
          <WhyUs />
        </ScrollStackItem>
        <ScrollStackItem itemClassName="overflow-y-auto">
          <SmartHUD 
            calculator={calculator}
            updateCalculator={updateCalculator}
            estimates={estimates}
            setAllocationModal={setAllocationModal}
          />
        </ScrollStackItem>
        <ScrollStackItem>
          <Reviews reviews={reviews} />
        </ScrollStackItem>
        <ScrollStackItem itemClassName="!bg-black">
          <Footer timeText={timeText} />
        </ScrollStackItem>
      </ScrollStack>

      {/* Allocation Modal popup */}
      {allocationModal && (
        <AllocationModal 
          selectedProject={selectedProject}
          setAllocationModal={setAllocationModal}
          setSelectedProject={setSelectedProject}
          estimates={estimates}
          calculator={calculator}
        />
      )}
    </div>
  );
}

export default App;
