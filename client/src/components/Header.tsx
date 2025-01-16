import Link from 'next/link';

import { ShoppingCartIcon } from 'lucide-react';

import { SITE_NAME } from '@/lib/constants';

import Navbar from './Navbar';
import { Button } from './ui/button';

export default async function Header() {
  return (
    <header className="relative mx-auto grid max-w-screen-3xl grid-cols-3 items-center px-4 py-5 text-primary lg:px-10 lg:py-6">
      <Navbar />
      <Link
        className="absolute lg:static lg:translate-x-0 lg:justify-self-center transition-all duration-[400ms] ease-in-out"
        href="/"
      >
        <h1 className="text-2xl text-primary font-bold italic">{SITE_NAME}</h1>
      </Link>
      <div className="col-start-3 flex items-center justify-end gap-5 justify-self-end">
        <Button variant={'outline'} className="relative" size="icon">
          <ShoppingCartIcon size={15} />
          <span className="sr-only">Cart</span>
        </Button>
      </div>
    </header>
  );
}
