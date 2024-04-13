'use client';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Page = () => {
  const { items, removeItem } = useCart();
  return (
    <div className="bg-custom-black">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl  font-light tracking-tight text-[#d5e2c4] sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12  lg:items-start lg:gap-x-16">
          <div
            className={cn('lg:col-span-7', {
              'rounded-lg border-dashed border-slate-800 p-12':
                items.length === 0,
            })}
          >
            <h2 className="sr-only"> Items In </h2>
            {items.length === 0 ? (
              <div className="flex h-full h- flex-coll items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-96 w-96 text-muted-foreground"
                >
                  <Image
                    src="/shoppingCart.png"
                    fill
                    loading="eager"
                    alt="empty shopping cart"
                  />
                </div>
              </div>
                      ) : null}
                      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
