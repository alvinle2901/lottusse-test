import React from 'react';

import Link from 'next/link';

import { Transition } from '@headlessui/react';

import { menuItems } from '@/lib/constants';

export interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  // items = [],
  show,
}) => {
  return (
    <Transition
      show={show}
      aria-live="polite"
      enter={`duration-1000 ease-out`}
      enterFrom="-translate-y-10"
      enterTo="translate-y-0"
      leave="delay-300 duration-[500ms] ease-in"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-10"
    >
      <div className="absolute top-20 z-10 w-full bg-background-primary transition-transform lg:hidden">
        <nav>
          <ul className="flex list-none flex-col gap-5 mb-5">
            {menuItems.map(({ href, label }) => (
              <Link href={href} passHref legacyBehavior key={label}>
                <span className="font-semibold uppercase text-primary text-base ml-5">{label}</span>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </Transition>
  );
};

export default MobileMenu;
