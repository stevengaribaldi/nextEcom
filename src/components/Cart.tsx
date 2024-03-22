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
import { BiCartAdd } from 'react-icons/bi';

const Cart = () => {
  const itemCount = 8;
  const fee = 1;
  return (
    <>
      <div className="relative flex items-center justify-center flex-col">
        <Sheet>
          <SheetTrigger className="group">
            <div
              className="relative flex items-center justify-center h-20 w-20 text-pink-100  group-hover:text-rose-100  custom-glow
             hover:-translate-y-0.3 transform   font-extralight text-lg  transition duration-200 ease-linear"
            >
              <ShoppingCart
                className="absolute font-extralight text-lg  "
                style={{ top: '-7px' }}
                size={50}
              ></ShoppingCart>
              <span
                style={{ right: 'calc(1.5rem + 0.04rem)' }}
                className="text-sm absolute top-1.5 right-6 h-5 w-6 rounded-full text-pink-100 font-extralight  flex items-center group-hover:text-pink-200 custom-glows justify-center "
              >
                {itemCount}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent className="flex flex-col bg-black w-[400px] sm:w-[290px] text-gray-100 ">
            <SheetHeader className="space-y-2.5 items-center pr-6 text-gray-100 ">
              <SheetTitle className="text-gray-100">
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
                        <button className="bg-black no-underline group cursor-pointer  items-center relative w-full rounded-full p-px text-lx font-semibold leading-9 text-gray-400 hover:text-sky-100  inline-block">
                          <span className="absolute inset-0 overflow-hidden rounded-full flex justify-center">
                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_65%)] opacity-10 transition-opacity duration-500 group-hover:opacity-100" />
                          </span>
                          <div className="relative flex space-x-2 justify-center items-center z-10 rounded-full bg-black py-0.5 px-4 ring-gray/10 ">
                            <span>Proceed to checkout</span>
                            <svg
                              className="animate-pulse text-gray-100 duration-3000"
                              fill="none"
                              height="16"
                              viewBox="0 0 24 24"
                              width="16"
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
                          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-700/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-30" />
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
