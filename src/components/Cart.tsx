'use client';
import React, { useEffect, useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import CartItem from './CartItem';


const Cart = () => {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const itemCount: number = items.length;
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );

    const getRightPosition = () => {
      if (itemCount === 0) {
        return 'calc(0.59rem + 1.3rem)';
      } else if (itemCount === 1) {
        return 'calc(0.64rem + 1.28rem)';
      } else if (itemCount <= 9 && itemCount > 1) {
        return 'calc(0.62rem + 1.28rem)';
      } else if (itemCount === 10) {
        return 'calc(0.64rem + 1.34rem)';
      } else if (itemCount === 11) {
        return 'calc(0.64rem + 1.34rem)';
      } else if (itemCount < 20 && itemCount >= 11) {
        return 'calc(0.64rem + 1.26rem)';
      } else if (itemCount >= 20 && itemCount < 100) {
        return 'calc(0.64rem + 1.28rem)';
      } else {
        return 'calc(0.64rem + 1.28rem)';
      }
    };

    const itemCountStyle = {
      right: getRightPosition(),
    };
  const fee: number = itemCount <= 0 ? 0 : 1;
  return (
    <>
      <div className="relative flex items-center justify-center flex-col h">
        <Sheet>
          <SheetTrigger className="group">
            <div className="relative flex transform  translate-x-11 -translate-y-0.5 items-center justify-center h-11 w-36 text-pink-200  custom-glow  ">
              <div
                className="relative flex hover:shadow-[0_6px_20px_rgba(209,192,208,50%)]
 w-full h-full transition-transform hover:ring-1 ring-pink-300 hover:ring-opacity-10 mb-1  bg-custom-black   hover:ring-pink-300 rounded-lg overflow-hidden
  ring-opacity-90"
              >
                <div className="absolute flex flex-col  font-extralight text-lg transition duration-3000 ease-linear border-transparent">
                  <div className=" mt-1.5 ml-8 ">
                    <Image
                      src="/cart.svg"
                      alt=""
                      width={42}
                      style={{ padding: '1px' }}
                      height={40}
                      // className="   "
                    />
                  </div>
                </div>

                <span
                  style={itemCountStyle}
                  className="text-xl absolute top-2 right-3 h-0 w-28 rounded-full text-[#81c336] font-semibold flex items-center justify-center
                   transition-transform duration-2500 ease-linear scale-90"
                >
                  {isMounted ? itemCount : 0}
                </span>
                <span
                  style={{ right: 'calc(1.5rem + 0.1rem)' }}
                  className="absolute top-6 right-1 h-0 w-12  rounded-full text-pink-200  font-extralight text-lg flex items-center justify-center "
                >
                  Cart
                </span>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent className="flex flex-col bg-[#020403] w-full pr-0 sm:max-w-lg text-gray-100 ">
            <SheetHeader className="space-y-2.5 items-center pr-6 text-gray-100 ">
              <SheetTitle className="text-gray-100 w-">
                {' '}
                Cart({isMounted ? itemCount : 0})
              </SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
              <>
                <div className="flex  text-champagne-b w-fu flex-col pr-6">
                  Cart Items
                </div>

                <div className="space-y-4 pr-6">
                  <Separator />
                  <div className="space-y-1.5 text-sm">
                    <div className="flex">
                      {/* <span className="flex-1">Shipping</span>
                      <span>Free</span> */}
                    </div>
                  </div>
                  <div className="space-y-1.5  text-[#dce8dc] text-sm">
                    <div className="flex text-[#dce8dc] ">
                      <span className="flex-1 text-[#dce8dc] ">
                        Transaction Fee
                      </span>
                      <span>{formatPrice(fee)}</span>
                    </div>
                    <div className="flex text-[#dce8dc] ">
                      <span className="flex-1 text-[#dce8dc] ">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex text-[#dce8dc] ">
                      <span className="flex-1 text-green-50 ">Total</span>
                      <span>{formatPrice(cartTotal + fee)}</span>
                    </div>
                  </div>
                  <SheetFooter>
                    <div></div>
                    <SheetTrigger
                      asChild
                      className="w-full items-center flex justify-center"
                    >
                      <Link href="/cart">
                        <button className="bg-custom-black no-underline  cursor-pointer  relative w-full rounded-full p-px text-lx font-semibold leading-9 text-white hover:text-sky-100 inline-block">
                          <div className="shadow-[0_6px_20px_rgba(209,192,208,50%)] justify-center glow-on-hover ring-1 ring-[#d5e2c4] ring-opacity-10 bg-[#d1c0d0a0]  py-0.5  hover:bg-[#d1c0d0a0]  text-white  rounded-md font-normal transition duration-200 ease-linear lg:flex lg:flex-1  hover:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset]  text-xl  hover:ring-0">
                            <span>Proceed to checkout</span>
                            <svg
                              className="animate-pulse text-pink-100 duration-3000"
                              fill="none"
                              height="18"
                              viewBox="0 0 10 10"
                              width="18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.75 8.75L14.25 12L10.75 15.25"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </div>
                          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r  transition-opacity duration-500 group-hover:opacity-30" />
                        </button>
                      </Link>
                    </SheetTrigger>
                  </SheetFooter>
                  <ScrollArea>
                    {items.map(({ product }) => (
                      <CartItem product={product} key={product.id} />
                    ))}
                  </ScrollArea>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="flex content-center w-full flex-col items-center justify-center"
                >
                  <div className="mt-[-400px] relative  text-muted-foreground justify-center content-center inset-0 flex-col flex h-full bg-slate-950 rounded-lg mb-1 ">
                    <h1 className=" items-center justify-center px-1 flex-row  text-white rounded-md text-2xl">
                      Your Cart is empty.
                      <h2 className=" items-center justify-center px-1  text-white rounded-md  flex-row mt-2 text-sm">
                        Check your Saved for later items below or{' '}
                        <SheetTrigger asChild>
                          <Link
                            href="/products"
                            className="text-blue-500  hover:text-blue-600"
                          >
                            {' '}
                            continue shopping.
                          </Link>
                        </SheetTrigger>
                      </h2>
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
export default Cart;
