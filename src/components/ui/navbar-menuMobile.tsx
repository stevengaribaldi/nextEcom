'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  icon,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item?: string;
  name?: string;
  icon?: JSX.Element;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item || '')} className="flex">
      {icon ? (
        <motion.div
          transition={{ duration: 0.3 }}
          className="cursor-pointer   flex max-w-screen-sm items-center justify-center  h-1 py-0  -my-0 mb-1"
        >
          <div className="flex   flex-col items-center ">
            <div className="-mb-1  ml-1.5">{icon}</div>{' '}
            <span className="text-sm  text-pink-200">{item}</span>
          </div>
        </motion.div>
      ) : (
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer  hover:opacity-[0.9]  "
        >
          {item}
        </motion.p>
      )}
      {active !== null && active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="absolute top-full -right-[125%] transform translate-y-8 -translate-x-1/3 pt-3.5"
        >
          <motion.div
            transition={transition}
            layoutId="active"
            className=" bg-[#09120e]   rounded-2xl backdrop-blur-2xl overflow-hidden border border-[#fad6a5]  shadow-2xl"
          >
            {/* bg-[#555d50] */}
            <motion.div layout className="w-max h-9 p-4 pl-6">
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative  -mb-7 flex justify-center space-x-4 -px-8 py-6 -mx-1 -my-6"
    >
      {children}
    </nav>
  );
};
export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href?: string;
  src?: string;
}) => {
  return href ? (
    <Link href={href} className="flex space-x-2">
      {src && (
        <Image
          src={src}
          width={140}
          height={70}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-2xl"
        />
      )}
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  ) : (
    <div className="flex space-x-2">
      {src && (
        <Image
          src={src}
          width={140}
          height={70}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-2xl"
        />
      )}
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </div>
  );
};

type HoveredLinkProps = {
  onHover: () => void;
  onLeave: () => void;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  style: React.CSSProperties;
};

export const HoveredLink: React.FC<HoveredLinkProps> = ({
  onHover,
  onLeave,
  children,
  href,
  onClick,
  style,
}) => {
  if (onClick) {
    return (
      <button
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="text-amber-100 justify-center items-center -mt-7 cursor-pointer"
        style={style}
      >
        {children}
      </button>
    );
  } else {
    if (!href)
      throw new Error(
        'Href must be provided for HoveredLink when used as a link',
      );
    return (
      <Link
        href={href}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="text-amber-100 justify-center items-center -mt-6"
        style={style}
      >
        {children}
      </Link>
    );
  }
};