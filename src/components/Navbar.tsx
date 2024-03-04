'use client';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import NavItems from './NavItems';
import Image from 'next/image';
import Cart from './Cart';

const Navbar = () => {
  const user = null;
  return (
    <div className="bg-black sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-black">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex items-center">
              {/* TODO MOBILE NAV */}

              <div className="ml-0 flex lg:ml-0">
                <Link href="/">
                  <Image src="/sila.svg" alt={''} width={60} height={60} />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/signin"
                      className="
                      hover:shadow-[0_6px_20px_rgba(0,118,255,23%)]
                      px-8 py-2 rounded-md text-gray-500 font-light transition duration-200 ease-linear"
                    >
                      Sign in
                    </Link>
                  )}
                  {user ? null : (
                    <span className="h-6 w-px bg-gray-300" aria-hidden="true" />
                  )}
                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      href="/register"
                      className="
                      hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] px-8 py-2 rounded-md text-gray-500 font-light transition duration-200 ease-linear"
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
                  <div className="ml-4 flow-root lg:ml-6 size-9">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
