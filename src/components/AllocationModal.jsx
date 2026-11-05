import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '917305130207';

export default function AllocationModal({ 
  selectedProject, 
  setAllocationModal, 
  setSelectedProject, 
  estimates = {},
  calculator = {}
}) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    email: '',
    specifics: ''
  });

  // 1. Comprehensive Background Scroll Locking & Lenis Disabling
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    // Freeze both body and html to prevent page-level scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    // Pause Lenis smooth scrolling engine if active
    if (window.__lenis) {
      window.__lenis.stop();
    }

    // Intercept wheel & touchmove events outside the modal card
    const preventBackdropScroll = (e) => {
      const modalCard = document.getElementById('allocation-modal-card');
      if (modalCard && modalCard.contains(e.target)) {
        // Allow user to scroll inside the modal content on mobile screens
        return;
      }
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('wheel', preventBackdropScroll, { passive: false });
    window.addEventListener('touchmove', preventBackdropScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalTouchAction;

      // Resume Lenis smooth scroll
      if (window.__lenis) {
        window.__lenis.start();
      }

      window.removeEventListener('wheel', preventBackdropScroll);
      window.removeEventListener('touchmove', preventBackdropScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setAllocationModal(false);
    if (setSelectedProject) setSelectedProject(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Structured WhatsApp Routing on Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let structuredMessage = '';

    if (selectedProject) {
      // Structured project inquiry
      structuredMessage = [
        '🏗️ *NEW PROJECT INQUIRY — NOOR INFRASTRUCTURE*',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '👤 *CLIENT PROFILE*',
        `• *Client Name:* ${formData.clientName.trim()}`,
        `• *Mobile Phone:* ${formData.phone.trim()}`,
        `• *Email:* ${formData.email.trim()}`,
        '',
        '🏢 *PROJECT ALLOCATION DETAILS*',
        `• *Project Name:* ${selectedProject.title}`,
        `• *Location:* ${selectedProject.location}`,
        `• *Built-Up Area:* ${selectedProject.specifications?.type ? `${selectedProject.specifications.type} (${selectedProject.specifications?.area || selectedProject.area})` : selectedProject.area}`,
        `• *Project Status:* ${selectedProject.progress === 100 ? 'Completed / Handed Over' : `${selectedProject.progress}% In Progress`}`,
        '',
        '📝 *CLIENT SPECIFICS / REQUIREMENTS*',
        formData.specifics.trim() || 'Requesting project site visit, allocation details, and investment prospectus.',
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '📍 *Head Office:* 5, East Coast Rd, Pudupattinam, Kalpakkam, Tamil Nadu 603102',
        '🌐 _Submitted via Noor Infrastructure Portal_'
      ].join('\n');
    } else {
      // Structured estimator telemetry inquiry
      const pkg = estimates.packageName || 'Standard Package';
      const area = estimates.floorArea || (calculator.groundFloor ? `${calculator.groundFloor} SQ FT` : 'Custom');
      const val = estimates.cost ? `₹${estimates.cost} LAKHS` : 'Custom Estimate';

      structuredMessage = [
        '🏗️ *NEW ESTIMATION INQUIRY — NOOR INFRASTRUCTURE*',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '👤 *CLIENT PROFILE*',
        `• *Client Name:* ${formData.clientName.trim()}`,
        `• *Mobile Phone:* ${formData.phone.trim()}`,
        `• *Email:* ${formData.email.trim()}`,
        '',
        '📊 *ESTIMATION TELEMETRY DATA*',
        `• *Selected Package:* ${pkg}`,
        `• *Total Built-up Area:* ${area} SQ FT`,
        `• *Water Sump:* ${calculator.waterSump ? `${Number(calculator.waterSump).toLocaleString('en-IN')} Ltr` : 'Standard'}`,
        `• *Septic Tank:* ${calculator.septicTank ? `${Number(calculator.septicTank).toLocaleString('en-IN')} Ltr` : 'Standard'}`,
        `• *Compound Wall:* ${calculator.compoundLength ? `${calculator.compoundLength}L × ${calculator.compoundHeight}H ft` : 'Standard'}`,
        `• *Estimated Valuation:* ${val}`,
        ...(estimates.timeline ? [`• *Estimated Timeline:* ~${estimates.timeline} Months`] : []),
        '',
        '📝 *CLIENT SPECIFICS / REQUIREMENTS*',
        formData.specifics.trim() || `Requesting formal site visit, architectural consultation, and plot inspection for ${pkg}.`,
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '📍 *Head Office:* 5, East Coast Rd, Pudupattinam, Kalpakkam, Tamil Nadu 603102',
        '🌐 _Submitted via Noor Infrastructure Smart Estimator_'
      ].join('\n');
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(structuredMessage)}`;

    // Open WhatsApp in a new tab or trigger WhatsApp mobile app
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!opened || opened.closed || typeof opened.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }

    // Dismiss modal cleanly
    handleClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        id="allocation-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-xl border border-white/10 p-5 sm:p-7 md:p-8 bg-neutral-900/95 shadow-2xl text-white scrollbar-none"
      >
        {/* Telemetry Corner Accents */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#ff6200]/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-[#ff6200]/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-[#ff6200]/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#ff6200]/60 pointer-events-none" />

        {/* Close Button */}
        <button 
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Strip */}
        <div className="border-b border-white/10 pb-4 mb-5">
          <span className="font-mono text-[9px] text-[#ff6200] tracking-widest block mb-1 font-semibold uppercase">
            // SECURE PORTAL APPLICATION
          </span>
          <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
            {selectedProject ? `ALLOCATION: ${selectedProject.title}` : 'PROJECT INQUIRY PORTAL'}
          </h3>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-mono text-[9px] text-neutral-400 tracking-wider mb-1.5 uppercase font-semibold">
              CLIENT FULL NAME <span className="text-[#ff6200]">*</span>
            </label>
            <input 
              type="text" 
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              required
              placeholder="Enter full legal name"
              className="w-full px-3.5 py-2.5 rounded bg-neutral-950/60 border border-white/10 focus:border-[#ff6200] focus:ring-1 focus:ring-[#ff6200] focus:outline-none font-mono text-xs text-white placeholder-neutral-500 transition-colors" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-mono text-[9px] text-neutral-400 tracking-wider mb-1.5 uppercase font-semibold">
                MOBILE PHONE <span className="text-[#ff6200]">*</span>
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+91 99999 99999"
                className="w-full px-3.5 py-2.5 rounded bg-neutral-950/60 border border-white/10 focus:border-[#ff6200] focus:ring-1 focus:ring-[#ff6200] focus:outline-none font-mono text-xs text-white placeholder-neutral-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block font-mono text-[9px] text-neutral-400 tracking-wider mb-1.5 uppercase font-semibold">
                EMAIL ADDRESS <span className="text-[#ff6200]">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 rounded bg-neutral-950/60 border border-white/10 focus:border-[#ff6200] focus:ring-1 focus:ring-[#ff6200] focus:outline-none font-mono text-xs text-white placeholder-neutral-500 transition-colors" 
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[9px] text-neutral-400 tracking-wider mb-1.5 uppercase font-semibold">
              ALLOCATION SPECIFICS
            </label>
            <textarea 
              name="specifics"
              value={formData.specifics}
              onChange={handleInputChange}
              rows="3"
              placeholder={selectedProject 
                ? `Requesting allocation details for: ${selectedProject.title}` 
                : `Describe your custom build requirement (e.g. details on ${estimates.packageName || 'Standard Package'} with ${estimates.floorArea || '2400'} sqft)`
              }
              className="w-full px-3.5 py-2.5 rounded bg-neutral-950/60 border border-white/10 focus:border-[#ff6200] focus:ring-1 focus:ring-[#ff6200] focus:outline-none font-mono text-xs text-white placeholder-neutral-500 resize-none transition-colors"
            />
          </div>

          {/* Dynamic cost details or project specs */}
          {selectedProject ? (
            <div className="bg-neutral-950/60 rounded p-3.5 border border-[#ff6200]/25 font-mono text-[10px] text-neutral-300 leading-relaxed">
              <div className="font-bold text-white mb-1.5 uppercase tracking-wider flex items-center justify-between">
                <span>// SELECTED PROJECT DETAILS:</span>
                <span className="text-[#ff6200] text-[9px]">ACTIVE</span>
              </div>
              <div className="uppercase space-y-1">
                <div>NAME: <span className="font-bold text-white">{selectedProject.title}</span></div>
                <div>LOCATION: <span className="font-bold text-white">{selectedProject.location}</span></div>
                <div>BUILT-UP AREA: <span className="font-bold text-white">{selectedProject.specifications?.type ? `${selectedProject.specifications.type} (${selectedProject.specifications?.area || selectedProject.area})` : selectedProject.area}</span></div>
                <div>EST. YEAR: <span className="font-bold text-white">{selectedProject.year}</span></div>
                <div>STATUS: <span className="font-bold text-[#ff6200]">{selectedProject.progress === 100 ? 'HANDED OVER' : `${selectedProject.progress}% IN PROGRESS`}</span></div>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-950/60 rounded p-3.5 border border-[#ff6200]/20 font-mono text-[10px] text-neutral-300 leading-relaxed">
              <div className="font-bold text-white mb-1.5 uppercase tracking-wider flex items-center justify-between">
                <span>// CURRENT ESTIMATION TELEMETRY:</span>
                <span className="text-[#ff6200] text-[9px]">LIVE TELEMETRY</span>
              </div>
              <div className="uppercase space-y-1">
                <div>PACKAGE: <span className="font-bold text-white">{estimates.packageName || 'STANDARD PACKAGE'}</span></div>
                <div>TOTAL AREA: <span className="font-bold text-white">{estimates.floorArea || calculator.groundFloor || '2400'} SQ FT</span></div>
                <div>WATER SUMP: <span className="font-bold text-white">{calculator.waterSump || 5000} LTR</span> | SEPTIC TANK: <span className="font-bold text-white">{calculator.septicTank || 3000} LTR</span></div>
                <div>COMPOUND WALL: <span className="font-bold text-white">{calculator.compoundLength || 120}L × {calculator.compoundHeight || 6}H FT</span></div>
                <div className="pt-1.5 text-[11px] border-t border-white/5 mt-1.5 flex items-center justify-between">
                  <span>ESTIMATED VALUATION:</span>
                  <span className="text-[#ff6200] font-bold text-xs">₹{estimates.cost || '62.38'} LAKHS</span>
                </div>
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#ff6200] to-[#d35400] text-white hover:from-[#ff8c39] hover:to-[#ff6200] transition-all duration-300 font-mono text-[11px] font-bold tracking-widest rounded mt-2 shadow-[0_4px_20px_rgba(255,98,0,0.3)] hover:shadow-[0_4px_25px_rgba(255,98,0,0.5)] cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.99]"
          >
            <span>TRANSMIT SECURE APPLICATION</span>
            <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
