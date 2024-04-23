'use client';
import React, { useEffect, useState } from 'react';
import { FloatingNav } from '../components/ui/floating-navbar';
import {
  IconHome,
  IconMessage,
  IconUser,
  IconTag,
  IconShoppingBag,
} from '@tabler/icons-react';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
const MobileNavbar = () => {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const itemCount: number = items.length;

  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <IconHome className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: 'Products',
      link: '/cart',
      icon: (
        <IconShoppingBag className="h-4 w-4 text-white dark:text-white" />
      ),
    },
    {
      name: 'Sell',
      link: '/sell',
      icon: <IconTag className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: 'Account',
      link: '/products',
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
              width={21}
              // style={{ padding: '1px' }}
              height={20}
              // className="   "
            />

            <span
              style={{ right: 'calc(0.43rem - 0.11rem)' }}
              className="text-xs absolute -top-1.5 right-3  rounded-full text-[#81c336] font-semibold flex items-center justify-center
                   transition-transform duration-2500 ease-linear scale-90"
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
