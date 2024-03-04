'use client';
import React from 'react';

import { ShoppingCart } from 'lucide-react';
import { Sheet, SheetTrigger } from './ui/sheet';

const Cart = ({ itemCount }: { itemCount: number }) => {
  return (
    <>
      <div className="relative flex items-center justify-center">
        <Sheet>
          <SheetTrigger className="group">
            <div className="relative flex items-center justify-center h-20 w-20">
              <ShoppingCart
                className="absolute text-gray-400 group-hover:text-gray-500"
                style={{ top: '-5px' }}
                size={48}
              ></ShoppingCart>
              <span
                style={{ right: 'calc(1.5rem + 0.04rem)' }}
                className="text-base absolute top-2 right-6 h-5 w-6 rounded-full text-black  flex items-center justify-center "
              >
                {itemCount}
              </span>
            </div>
          </SheetTrigger>
        </Sheet>
      </div>
    </>
  );
};
export default Cart;
