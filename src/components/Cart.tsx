'use client';
import React from 'react';

import { ShoppingCart } from 'lucide-react';
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
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
const Cart = () => {
  const itemCount = 8;
  const fee = 1;
  return (
    <>
      <div className="relative flex items-center justify-center flex-col h">
        <Sheet>
          <SheetTrigger className="group">
            <div className="relative flex transform  translate-x-11 -translate-y-0.5 items-center justify-center h-11 w-36 text-pink-200  custom-glow  ">
              <div
                className="relative flex    hover:shadow-[0_6px_20px_rgba(209,192,208,50%)]
 w-full h-full transition-transform hover:ring-1 ring-pink-300 hover:ring-opacity-10 mb-1  bg-custom-black  hover:ring-pink-300 rounded-lg overflow-hidden
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
                      className="   "
                    />
                  </div>
                </div>
                <span
                  style={{ right: 'calc(1.5rem + 0.41rem)' }}
                  className="text-xl absolute top-3 right-3 h-0 w-28 rounded-full text-cyan-500 font-bold flex items-center justify-center
                   transition-transform duration-2500 ease-linear hover:scale-90"
                >
                  {itemCount}
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
          <SheetContent className="flex flex-col bg-custom-black w-[400px] sm:w-[290px] text-gray-100 ">
            <SheetHeader className="space-y-2.5 items-center pr-6 text-gray-100 ">
              <SheetTitle className="text-gray-100 w-">
                {' '}
                Cart({itemCount})
              </SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
              <>
                <div className="flex w-fu flex-col pr-6">
                  {/* TODO: cart items logic */}
                  cart items
                </div>

                <div className="space-y-4 pr-6">
                  <Separator />
                  <div className="space-y-1.5 text-sm">
                    <div className="flex">
                      <span className="flex-1">Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex">
                      <span className="flex-1">Transaction Fee</span>
                      <span>{formatPrice(fee)}</span>
                    </div>
                    <div className="flex">
                      <span className="flex-1">Subtotal</span>
                      <span>{formatPrice(fee)}</span>
                    </div>
                  </div>
                  <SheetFooter>
                    <div></div>
                    <SheetTrigger
                      asChild
                      className="w-full items-center flex justify-center"
                    >
                      <Link href="/cart">
                        <button className="bg-custom-black no-underline group cursor-pointer  items-center relative w-full rounded-full p-px text-lx font-semibold leading-9 text-gray-400 hover:text-sky-100  inline-block">
                          <span className="absolute inset-0 overflow-hidden rounded-full flex justify-center">
                            <span className="absolute inset-0 rounded-full opacity-10 transition-opacity duration-500 group-hover:opacity-100" />
                          </span>
                          <div className="  shadow-[0_6px_20px_rgba(209,192,208,50%)] glow-on-hover ring-1 ring-[#d5e2c4] ring-opacity-10 bg-[#d1c0d0a0]  py-0.5 px-4  hover:bg-[#d1c0d0a0] text-[#5b3b51]  rounded-md font-extralight transition duration-200 ease-linear lg:flex lg:flex-1  hover:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset]  text-lg  hover:ring-0">
                            <span>Proceed to checkout</span>
                            <svg
                              className="animate-pulse text-pink-100 duration-3000"
                              fill="none"
                              height="18"
                              viewBox="0 0 16 16"
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
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="flex content-center w-full flex-col items-center justify-center"
                >
                  {/* <Image
                    src="/hippo-empty-cart.png"
                    fill
                    alt="empty shopping cart"
                  ></Image> */}
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
