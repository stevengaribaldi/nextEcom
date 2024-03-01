'use client';
import { useState } from 'react';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  return (
    <>
      <div className="flex h-full gap-4"></div>
    </>
  );
};
export default NavItems;
