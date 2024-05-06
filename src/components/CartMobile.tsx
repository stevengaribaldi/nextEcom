'use client';
import React, { useEffect, useState, useRef } from 'react';

import Image from 'next/image';

import { Home, LogInIcon, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from './ui/scroll-area';
import { useCart } from '@/hooks/use-cart';
import CartItem from './CartItem';
import { User } from '@/payload-types';

interface NavbarProps {
  user: User | null;
}

const CartMobile = ({ user }: NavbarProps) => {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const itemCount: number = items.length;

  const getRightPosition = () => {
    if (itemCount === 0) {
      return 'calc(0.59rem - 0.12rem)';
    } else if (itemCount === 1) {
      return 'calc(0.64rem - 0.16rem)';
    } else if (itemCount <= 9 && itemCount > 1) {
      return 'calc(0.62rem - 0.19rem)';
    } else if (itemCount === 10) {
      return 'calc(0.24rem - 0.00rem)';
    } else if (itemCount === 11) {
      return 'calc(0.63rem - 0.411rem)';
    } else if (itemCount < 20 && itemCount >= 11) {
      return 'calc(0.63rem - 0.37rem)';
    } else if (itemCount >= 20 && itemCount < 100) {
      return 'calc(0.63rem - 0.44rem) ';
    } else {
      return 'calc(0.59rem - 0.6rem)';
    }
  };

  const itemCountStyle = {
    right: getRightPosition(),
    transform: isOpen ? 'scale(1.0)' : 'scale(0.75)',
    transition: 'transform 250ms ease-in-out',
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);
  const handleClickInside = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };
  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-3 -mt-0.5 -mb-4 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <div className="relative flex transform   text-pink-200  ">
          <div>
            <div className="">
              <Image
                src="/cart.svg"
                alt=""
                width={32}
                height={20}
                className=" mb-1.5 -mt-3 -top-1 w-18"
              />
            </div>

            <span
              style={itemCountStyle}
              className="text-base absolute -top-[20px]   rounded-full text-[#81c336] font-normal flex items-center justify-center
                   transition-transform duration-2500 ease-linear scale-150 "
            >
              {isMounted ? itemCount : 0}
            </span>
          </div>
        </div>
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div
        ref={navRef}
        className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex"
        onClick={() => setIsOpen(false)}
      >
        <div className="w-4/5 ">
          <div
            onClick={handleClickInside}
            className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-[#09120e] ring-2 ring-[#020403] rounded-sm   pb-12 shadow-xl"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              ></button>
            </div>
            <Link href="/cart">
              <button className=" no-underline items-center  cursor-pointer justify-center  relative w-full rounded-full p-px text-lx font-semibold leading-9 text-white hover:text-sky-100 inline-block">
                <div className="shadow-[0_6px_20px_rgba(209,192,208,50%)] text-center items-center justify-center glow-on-hover ring-1 ring-[#b4bfa6] ring-opacity-10 bg-[#d3bdd2ca]  py-0.5  hover:bg-[#d1c0d0a0]  text-white  rounded-md font-normal transition duration-200 ease-linear flex flex-1  hover:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset]  text-xl  hover:ring-0">
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
            <div className="mt-2 mr-8">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
            </div>
            {user ? (
              <div className="flow-root rounded-2xl ">
                <Link
                  onClick={() => closeOnCurrent('/login')}
                  href="/"
                  className="-m-2 block p-2 rounded-xl hover:text-[#09120e] font-medium hover:bg-slate-50 text-amber-100"
                >
                  <div className="flex items-center justify-start gap-2 ">
                    <Home />
                    <div className="flex  space-y-0.5 leading-none">home</div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="space-y-6  border-t   border-[#fad6a5] px-4 py-6">
                <div className="flow-root rounded-2xl ">
                  <Link
                    onClick={() => closeOnCurrent('/login')}
                    href="/login"
                    className="-m-2 block p-2 rounded-xl hover:text-[#09120e] font-medium hover:bg-slate-50 text-amber-100"
                  >
                    <div className="flex items-center justify-start gap-2 ">
                      <LogInIcon />
                      <div className="flex  space-y-0.5 leading-none">
                        Log In
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flow-root">
                  <Link
                    onClick={() => closeOnCurrent('/create-account')}
                    href="/create-account"
                    className="-m-2 block p-2 rounded-xl hover:text-[#09120e] font-medium hover:bg-slate-50 text-amber-100"
                  >
                    <div className="flex items-center justify-start gap-2 ">
                      <UserPlus />
                      <div className="flex  space-y-0.5 leading-none">
                        {' '}
                        Create Account
                      </div>
                    </div>{' '}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMobile;
