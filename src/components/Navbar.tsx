'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import NavItems from './NavItems';
import Image from 'next/image';
import Cart from './Cart';
import MobileNavbar from './MobilNavbar';
import UserAccountNav from './UserAccountNav';
import { User } from '@/payload-types';

interface NavbarProps {
  user: User | null;
}
const Navbar = ({ user }: NavbarProps) => {
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const toggleRotation = () => {
      setIsRotating((prev) => !prev);
    };

    document.addEventListener('click', toggleRotation);

    return () => document.removeEventListener('click', toggleRotation);
  }, []);

  return (
    <div className=" sticky z-50  top-0 inset-x-0 h-0">
      <section className="border-t border-custom-black"> </section>

      <section className="border-t border-custom-black"> </section>
      <section className="border-t border-custom-black"> </section>

      <header className="relative bg-custom-black  ">
        <MaxWidthWrapper>
          <div className=" ">
            <MobileNavbar />
            <div className="flex items-center">
              <div
                className={`ml-0 flex lg:ml-0 ${isRotating ? 'continuous-step-spin' : ''}`}
              >
                <Link href="/">
                  <Image
                    src="/8wheel.svg"
                    alt={''}
                    width={90}
                    height={90}
                    className="-rotate-180 hidden relative z-50 lg:block 2xl:block"
                  />
                </Link>
              </div>
              <div className="hidden z-50 -md:ml-15  lg:ml-8 md:block lgr:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto  flex  items-center">
                <div className="hidden md:pr-5 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 md:flex md:flex-1 md:items-center md:justify-end -md:space-x-4">
                  {user ? null : (
                    <Link
                      href="/login"
                      className="hover:ring-1 ring-pink-300 hover:ring-opacity-10
                      hover:shadow-[0_6px_20px_rgba(209,192,208,50%)]
                       px-8 py-2 rounded-md text-pink-200 bg-custom-black  font-extralight text-lg  transition duration-200 ease-linear"
                    >
                      Log in
                    </Link>
                  )}
                  {user ? null : (
                    <span className="h-6 w-px bg-pink-100" aria-hidden="true" />
                  )}
                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="/create-account"
                      className="hover:ring-1 ring-pink-300 hover:ring-opacity-10
                      hover:shadow-[0_6px_20px_rgba(209,192,208,50%)]
                       px-8 py-2 rounded-md text-pink-200 bg-custom-black  font-extralight text-lg  transition duration-200 ease-linear"
                    >
                      Create account
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

      <section className="border-t border-[#6c516c] "></section>

    </div>
  );
};

export default Navbar;
