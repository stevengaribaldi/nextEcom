'use client';
import { useState } from 'react';
import { PRODUCT_CATEGORIES } from './config';
import NavItem from './NavItem';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  return (
    <>
      <div className="flex h-full gap-4">
        {PRODUCT_CATEGORIES.map((category, i) => {
          const handleOpen = () => {
            if (activeIndex === i) {
              setActiveIndex(null);
            } else {
              setActiveIndex(i);
            }
          };
          const isOpen = i === activeIndex;
          return <NavItem />;
        })}
      </div>
    </>
  );
};
export default NavItems;
