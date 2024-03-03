import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import NavItems from './NavItems';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex items-center">
              {/* TODO MOBILE NAV */}

              <div className="ml-0 flex lg:ml-0">
                <Link href="/">
                  <Image src="/silla.svg" alt={''} width={60} height={60} />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex- lg:items-center lg:justify-end lg:space-x-6"></div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
