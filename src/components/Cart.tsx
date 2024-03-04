'use client';
import React from 'react';

import { ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';

const Cart = () => {
  const itemCount = 0;
  return (
    <>
      <div className="relative flex items-center justify-center">
        <Sheet>
          <SheetTrigger className="group">
            <div className="relative flex items-center justify-center h-20 w-20">
              <ShoppingCart
                className="absolute text-gray-400 group-hover:text-gray-100"
                style={{ top: '-9px' }}
                size={58}
              ></ShoppingCart>
              <span
                style={{ right: 'calc(1.5rem + 0.04rem)' }}
                className="text-lg font-bold absolute top-2 right-6 h-5 w-6 rounded-full text-gray-100  flex items-center justify-center "
              >
                {itemCount}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6">
              <SheetTitle> Cart({itemCount})</SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
              <>
                <div className="flex w-fu; flex-col pr-6">
                  {/* TODO: cart items logic */}
                  cart items
                </div>

                <div className="space-y-4 pr-6">
                  <Separator />
                  <div className="space-y-1.5 pr-6"></div>
                </div>
              </>
            ) : (
              <div ></div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
export default Cart;
