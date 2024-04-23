import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string | JSX.Element;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`flex max-w-screen-sm h-max bg-custom-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-2 px-8 space-x-8 items-center justify-center mx-auto ${className}`}
    >
      {navItems.map((navItem, idx) => (
        <Link
          key={idx}
          href={navItem.link}
          className="flex flex-col items-center text-neutral-600  hover:text-neutral-300"
        >
          <span>{navItem.icon}</span>
          <span className="text-sm mt-0 text-[#effaf7] ">{navItem.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export default FloatingNav;
