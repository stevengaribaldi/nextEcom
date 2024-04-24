'use client';
import React, { useEffect, useState } from 'react';
import  FloatingNav  from '../components/ui/floating-navbar';
import {
  IconHome,
  IconMessage,
  IconUser,
  IconTag,
  IconShoppingBag,
} from '@tabler/icons-react';

import Image from 'next/image';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import { useCart } from '@/hooks/use-cart';
import CartItem from './CartItem';
import Cart from './Cart';

const MobileNavbar = () => {

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
      link: <MobileNav />,

    },
  ];

  return (
    <div className="relative z-40 md:hidden lg:hidden  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};



const MobileNav = () => {
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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
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
        </div>{' '}
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent('/sign-in')}
                  href="/sign-in"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent('/sign-up')}
                  href="/sign-up"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default MobileNav;
export default MobileNavbar;
