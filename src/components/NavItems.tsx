'use client';
import { useState, useRef, useEffect } from 'react';
import { PRODUCT_CATEGORIES } from './config';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/app/hooks/use-on-click-outside';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      }
    };
    document.addEventListener('keydown', handler);
    return () => removeEventListener('keydown', handler);
  }),
    [];
  return (
    <div>
      <div className="flex h-full gap-8" ref={navRef}>
        {PRODUCT_CATEGORIES.map((category, i) => {
          const handleOpen = () => {
            if (activeIndex === i) {
              setActiveIndex(null);
            } else {
              setActiveIndex(i);
            }
          };
          const isOpen = i === activeIndex;
          return (
            <NavItem
              category={category}
              handleOpen={handleOpen}
              isOpen={isOpen}
              key={category.value}
              isAnyOpen={isAnyOpen}
            />
          );
        })}
      </div>
    </div>
  );
};
export default NavItems;
