'use client';
import React, { useEffect, useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from './ui/sheet';
import { Separator } from './ui/separator';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
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
          <SheetTrigger className=" group">
            <div className="relative flex transform  translate-x-11 -translate-y-0.5 items-center justify-center h-10  w-36 text-pink-200  custom-glow  ">
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
          <SheetContent className="flex flex-col bg-[#09120e] w-[400px] sm:w-[340px] pr-0 sm:max-w-lg text-[#fad6a5] ">
            <SheetHeader className="space-y-2.5 items-center pr-6 text-[#fad6a5] ">
              <SheetTitle className="text-[#fad6a5] ">
                {' '}
                Cart({isMounted ? itemCount : 0})
              </SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
              <>
                <div className="flex  text-[#fad6a5] w-full flex-col pr-6">
                  Cart Items
                </div>

                {/* <div className=" pr-6"> */}
                <Separator className="bg-[#fad6a5] text-[#fad6a5]" />
                <div className="space-y-1.5 text-sm">
                  <div className="flex"></div>
                </div>
                <div className="space-y-1.5 pr-6 text-[#fad6a5]text-sm">
                  <div className="flex  text-[#fad6a5]">
                    <span className="flex-1 text-[#fad6a5]">
                      Processing Fee
                    </span>
                    <span>{formatPrice(fee)}</span>
                  </div>
                  <div className="flex text-[#fad6a5]">
                    <span className="flex-1 text-[#fad6a5]">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex text-[#fad6a5]">
                    <span className="flex-1 text-[#fad6a5] ">Total</span>
                    <span>{formatPrice(cartTotal + fee)}</span>
                  </div>
                </div>
                <SheetTrigger asChild>
                  <Link href="/cart">
                    <button className=" no-underline items-center  pr-6  cursor-pointer justify-center  relative w-full rounded-full p-px text-lx font-semibold leading-9 text-white hover:text-sky-100 inline-block">
                      <div className="shadow-[0_6px_20px_rgba(209,192,208,50%)] text-center items-center justify-center glow-on-hover ring-1 ring-[#d5e2c4] ring-opacity-10 bg-[#d1c0d0a0]  py-0.5  hover:bg-[#d1c0d0a0]  text-white  rounded-md font-normal transition duration-200 ease-linear flex flex-1  hover:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset]  text-xl  hover:ring-0">
                        <span>Proceed to checkout</span>
                        <svg
                          className="animate-pulse text-white-200 duration-3000"
                          fill="none"
                          height="18"
                          viewBox="0 0 10 21"
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

                <ScrollArea>
                  {items.map(({ product, id }) => (
                    <CartItem
                      product={product}
                      key={product.id}
                      cartItemId={id}
                    />
                  ))}
                </ScrollArea>
                {/* </div> */}
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="flex content-center w-full flex-col items-center justify-center"
                >
                  <div className="mt-[-400px] relative  text-muted-foreground justify-center content-center inset-0 flex-col flex h-full bg-slate-950 rounded-lg mb-1 ">
                    <h1 className=" items-center justify-center px-1 flex-row  text-[#fad6a5] rounded-md text-2xl">
                      Your Cart is empty.
                      <h2 className=" items-center justify-center px-1  text-[#fad6a5] rounded-md  flex-row mt-2 text-sm">
                        Check your Saved for later items below or{' '}
                        <SheetTrigger className="" asChild>
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
