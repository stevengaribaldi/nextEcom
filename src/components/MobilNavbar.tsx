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
      icon: <IconHome className="h-5 w-5 text-white dark:text-white" />,
    },
    {
      name: 'Products',
      link: '/products',
      icon: <IconShoppingBag className="h-5 w-5 text-white dark:text-white" />,
    },
    {
      name: 'Sell',
      link: '/sell',
      icon: <IconTag className="h-5 w-5 text-white dark:text-white" />,
    },
    user
      ? {
          link: <AccountIconMobile className=" text-[#bdeade] " />,
        }
      : {
          name: 'Account',
          link: '/login',
          icon: <IconUser className="h-5 w-5 text-white dark:text-white" />,
        },
    {
      name: 'Cart',
      link: <CartMobile  user={user} />,
    },
  ];

  return (
    <div className="relative z-40 md:hidden lg:hidden w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default MobileNavbar;
