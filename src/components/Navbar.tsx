'use client';
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import NavItems from './NavItems';
import Image from 'next/image';
import Cart from './Cart';
import { Separator } from './ui/separator';

const Navbar = () => {
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const toggleRotation = () => {
      setIsRotating((prev) => !prev);
    };

    document.addEventListener('click', toggleRotation);

    return () => document.removeEventListener('click', toggleRotation);
  }, []);
  const user = null;
  return (
    <div className=" sticky z-50 top-0 inset-x-0 h-0">
      <header className="relative ">
        <MaxWidthWrapper>
          <div className=" ">
            <div className="flex items-center">
              {/* TODO MOBILE NAV */}

              <div
                className={`ml-0 flex lg:ml-0 ${isRotating ? 'continuous-step-spin' : ''}`}
              >
                <Link href="/">
                  <Image
                    src="/8wheel.svg"
                    alt={''}
                    width={90}
                    height={90}
                    className="-rotate-180  "
                  />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className="hover:ring-1 ring-pink-300 hover:ring-opacity-10
                      hover:shadow-[0_6px_20px_rgba(0,118,255,5%)]
                       px-8 py-2 rounded-md text-pink-100   font-extralight text-lg  transition duration-200 ease-linear"
                    >
                      Sign in
                    </Link>
                  )}
                  {user ? null : (
                    <span className="h-6 w-px bg-pink-100" aria-hidden="true" />
                  )}
                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      href="/register"
                      className="hover:ring-1 ring-pink-300 hover:ring-opacity-10
                      hover:shadow-[0_6px_20px_rgba(0,118,255,5%)] mr-8
                       px-8 py-2 rounded-md text-pink-100   font-extralight text-lg  transition duration-200 ease-linear"
                    >
                      Register
                    </Link>
                  )}
                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}
                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-300"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="ml-4 flow-root lg:ml-6 size-9 ">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
      <section className="border-t border-gray-800"> </section>
    </div>
  );
};

export default Navbar;
