import React from 'react';
import CardNav from './CardNav';

const MENU_ITEMS = [
  {
    label: 'Navigate',
    bgColor: '#18181b', // dark charcoal
    textColor: '#ffffff',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Why Choose Us', href: '#why-us' },
      { label: 'Client Reviews', href: '#reviews' }
    ]
  },
  {
    label: 'Portfolio',
    bgColor: '#ff6200', // brand orange
    textColor: '#ffffff',
    links: [
      { label: 'All Projects', href: '#projects' },
      { label: 'Residential Villas', href: '#projects' },
      { label: 'Commercial Helix', href: '#projects' }
    ]
  },
  {
    label: 'Portal',
    bgColor: '#27272a', // lighter charcoal
    textColor: '#ffffff',
    links: [
      { label: 'Cost Estimator', href: '#estimator' },
      { label: 'Secure Inquiry', href: '#enquire' }
    ]
  }
];

export default function Header({ setAllocationModal }) {
  return (
    <CardNav
      logo="/ncs-logo.png"
      logoAlt="NCS Logo"
      items={MENU_ITEMS}
      onCtaClick={() => setAllocationModal(true)}
    />
  );
}

