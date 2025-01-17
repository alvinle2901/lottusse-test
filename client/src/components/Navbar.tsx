'use client';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { menuItems } from '@/lib/constants';

export default function Navbar() {
  return (
    <NavigationMenu className="hidden md:block ml-[-15px] ">
      <NavigationMenuList>
        {menuItems.map(({ href, label }) => (
          <NavigationMenuItem key={label}>
            <Link href={href} passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
