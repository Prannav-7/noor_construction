import React from 'react';
import CardNav from './CardNav';

export default function Header({ setAllocationModal }) {
  return (
    <CardNav
      logo="/logo.png"
      logoAlt="NCS Logo"
      onCtaClick={() => setAllocationModal(true)}
    />
  );
}

