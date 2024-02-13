import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';

const Navbar = () => {
  return (
  <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between h-16">
              {/* TODO MOBILE NAV */}

              <div className="ml-0 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                {/* <NavItems /> */}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
