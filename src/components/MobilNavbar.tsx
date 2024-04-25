'use client';
import React, { useEffect, useState, useRef } from 'react';
import FloatingNav from '../components/ui/floating-navbar';

import {
  IconHome,
  IconUser,
  IconTag,
  IconShoppingBag,
} from '@tabler/icons-react';
import CartMobile from './CartMobile';
import AccountIconMobile from './AccountIconMobile';
import { User } from '@/payload-types';

interface NavbarProps {
  user: User | null;
}
const MobileNavbar = ({ user }: NavbarProps) => {
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
    user
      ? {
          link: (
            <AccountIconMobile className="h-4 w-4 text-white dark:text-white" />
          ),
        }
      : {
          name: 'Log In',
          link: '/login', // Login page for non-logged users
          icon: <IconUser className="h-4 w-4 text-white dark:text-white" />,
        },
    {
      name: 'Cart',
      link: <CartMobile />,
    },
  ];

  return (
    <div className="relative z-40 md:hidden lg:hidden w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default MobileNavbar;
