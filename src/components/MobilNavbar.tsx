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
import { el } from 'date-fns/locale';
const MobileNavbar = () => {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
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
