import React from 'react';
import CardNav from './CardNav';

export default function Header({ setAllocationModal, showNav }) {
  return (
    <CardNav
      logo="/WhatsApp Image 2026-11-05 at 10.43.49 AM.jpeg"
      logoAlt="NCS Logo"
      onCtaClick={() => setAllocationModal(true)}
      showNav={showNav}
    />
  );
}
