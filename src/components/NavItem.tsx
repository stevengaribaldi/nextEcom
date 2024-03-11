'use client';
import { Button } from './ui/button';
import { PRODUCT_CATEGORIES } from './config/index';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Category = (typeof PRODUCT_CATEGORIES)[number];
interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {

  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5 hover:shadow-[0_6px_20px_rgba(0,118,255,5%)]
                               hover:ring-1 ring-pink-300 hover:ring-opacity-10
font-extralight text-lg
                       px-8 py-2 rounded-md text-pink-100  transition duration-200 ease-linear"
          onClick={handleOpen}
          variant={isOpen ? 'secondaryglow' : 'ghostnoglow'}
        >
          {category.label}{' '}
          <ChevronDown
            className={cn('h-4 w-4 rounded-full transition-all', {
              'animate-pulse text-gray-100 duration-2500': !isOpen,
              'text-white -rotate-180 font-extralight': isOpen,
            })}
          />
        </Button>
      </div>
      {isOpen ? (
        <div
          onClick={() => close()}
          className={cn(
            'absolute inset-x-0 top-full text-sm text-muted-foreground',
            {
              'animate-in fade-in-10 slide-in-from-top-5': !isAnyOpen,
            },
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow "
            aria-hidden="true"
          />
          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3  gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      onClick={() => close}
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg ring-2 ring-rose-900 ring-opacity-10 shadow-light-blue-lg hover:ring-2 hover:ring-slate-400 hover:ring-opacity-90">
                        <Image
                          src={item.imageSrc}
                          alt="product category image"
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 " aria-hidden="true">
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
{
  /* <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
  <span className="relative z-20">Top gradient</span>
</button>; */
}
