import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

type NavItem = {
  name: string | JSX.Element;
  link: string | JSX.Element;
  icon?: JSX.Element;
};

type FloatingNavProps = {
  navItems: NavItem[];
  className?: string;
};

const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, className }) => {
  return (
    <div

      className={`flex max-w-screen-sm h-max bg-custom-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-2 px-8 space-x-8 items-center justify-center mx-auto ${className}`}
    >
      {navItems.map((navItem, idx) =>
        React.isValidElement(navItem.link) ? (
          <div
            key={idx}
            className="flex flex-col items-center text-neutral-600 bg-custom-black"
          >
            {navItem.link}
            <span className="text-sm mt-0 text-[#effaf7]">{navItem.name}</span>
          </div>
        ) : (
          <Link
            key={idx}
            href={navItem.link as string} // Cast to string if you're sure it's a string
            className="flex flex-col items-center text-neutral-600 bg-custom-black "
          >
            <span>{navItem.icon}</span>
            <span className="text-sm mt-0 text-[#effaf7]">{navItem.name}</span>
          </Link>
        ),
      )}
    </div>
  );
};

export default FloatingNav;
