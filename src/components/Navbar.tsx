import { Link } from 'lucide-react';
import MaxWithWrapper from './MaxWidthWrapper';

const Navbar = () => {
  return (
    <div className=" bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWithWrapper>
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between h-16">
              {/* TODO MOBILE NAV */}

                          <div className="ml-4 flex lg:ml-0">
                              <Link href="/">
                                  
                              </Link>
              </div>
            </div>
          </div>
        </MaxWithWrapper>
      </header>
    </div>
  );
};

export default Navbar;
