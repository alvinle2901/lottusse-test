'use client';

import { useState } from 'react';

import Link from 'next/link';

import { MenuIcon, ShoppingCartIcon, X } from 'lucide-react';

import { SITE_NAME } from '@/lib/constants';

import MobileMenu from './MobileMenu';
import Navbar from './Navbar';
import { Button } from './ui/button';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="relative mx-auto grid max-w-screen-3xl grid-cols-3 items-center px-4 py-5 text-primary lg:px-10 lg:py-6">
      {/* Menu button for mobile */}
      <Button
        variant={'outline'}
        className={`justify-self-start transition-opacity duration-300 ease-in-out lg:hidden ${
          openMenu ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => {
          setOpenMenu(true);
        }}
        size={'icon'}
      >
        <MenuIcon size={15} />
      </Button>
      {/* Menu for Mobile */}
      <MobileMenu
        show={openMenu}
      />
      <Navbar />
      <Link
        className={`absolute lg:static lg:translate-x-0 lg:justify-self-center transition-all duration-[400ms] ease-in-out 
          ${openMenu ? 'sm:justify-self-start ml-5' : 'justify-self-center'}`}
        href="/"
      >
        <h1 className="text-2xl text-primary font-bold italic">{SITE_NAME}</h1>
      </Link>
      <div
        className={`col-start-3 flex items-center justify-end gap-3 justify-self-end transition-transform duration-300 ease-in-out ${
          openMenu ? '-translate-x-10 lg:translate-x-0' : ''
        }`}
      >
        <Button variant={'outline'} className="relative mr-3" size="icon">
          <ShoppingCartIcon size={15} />
        </Button>
      </div>
      {/* Menu close Button */}
      <Button
        variant={'outline'}
        className={`absolute right-4 transition-opacity duration-300 lg:hidden ${
          openMenu ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => {
          setOpenMenu(false);
        }}
        size={'icon'}
      >
        <X size={15} />
      </Button>
    </header>
  );
}
