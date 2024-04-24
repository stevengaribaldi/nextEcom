'use client';
import React, { useEffect, useState } from 'react';
import { FloatingNav } from '../ui/floating-navbar';
import {
  IconHome,
  IconMessage,
  IconUser,
  IconTag,
  IconShoppingBag,
} from '@tabler/icons-react';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from '../ui/navbar-menuMobile';
import { cn } from '@/lib/utils';

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn('fixed top-10 inset-x-0 max-w-2xl mx-auto z-50', className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

const MobileNavbar = () => {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const itemCount: number = items.length;

  const getRightPosition = () => {
    if (itemCount === 0) {
      return 'calc(0.59rem - 0.21rem)';
    } else if (itemCount === 1) {
      return 'calc(0.64rem - 0.28rem)';
    } else if (itemCount <= 9 && itemCount > 1) {
      return 'calc(0.62rem - 0.28rem)';
    } else if (itemCount === 10) {
      return 'calc(0.24rem - 0.07rem)';
    } else if (itemCount === 11) {
      return 'calc(0.63rem - 0.48rem)';
    } else if (itemCount < 20 && itemCount >= 11) {
      return 'calc(0.63rem - 0.46rem)';
    } else if (itemCount >= 20 && itemCount < 100) {
      return 'calc(0.63rem - 0.49rem) ';
    } else {
      return 'calc(0.59rem - 0.6rem)';
    }
  };

  const itemCountStyle = {
    right: getRightPosition(),
  };
  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <IconHome className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: 'Products',
      link: '/products',
      icon: <IconShoppingBag className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: 'Sell',
      link: '/sell',
      icon: <IconTag className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: 'Account',
      link: '/login',
      icon: <IconUser className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: 'Cart',
      link: '/Cart',
      icon: (
        <div className="relative flex transform   text-pink-200  ">
          <div>
            <Image
              src="/cart.svg"
              alt=""
              width={22}
              // style={{ padding: '1px' }}
              height={20}
              className=" w-6"
            />

            <span
              style={itemCountStyle}
              className="text-xs absolute -top-2 right-3  rounded-full text-[#81c336] font-bold flex items-center justify-center
                   transition-transform duration-2500 ease-linear scale-75"
            >
              {isMounted ? itemCount : 0}
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative z-40 md:hidden lg:hidden  w-full">
      <FloatingNav navItems={navItems} />
      {/* <DummyContent /> */}
    </div>
  );
};

export default MobileNavbar;
