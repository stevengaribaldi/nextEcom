'use client';
import { Button } from '@/components/ui/button';
import { PRODUCT_CATEGORIES } from '@/config';
import { useCart } from '@/hooks/use-cart';
import { cn, formatPrice } from '@/lib/utils';
import { Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

const Page = () => {
  const { items, removeItem } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
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
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only"> Items In </h2>
            {isMounted && items.length === 0 ? (
              <div className="flex h-full h- flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-10   h-96 w-96 text-muted-foreground"
                >
                  <Image
                    src="/shoppingCart.png"
                    fill
                    loading="eager"
                    alt="empty shopping cart"
                  />
                </div>
                <h3 className="font-semibold text-muted-foreground text-[#fff8e7] text-2xl">
                  {' '}
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground text-[#f7e7ce] text-center">
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                'divide-y divide-slate-700 border-b border-t border-slate-500':
                  isMounted && items.length > 0,
              })}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    (c) => c.value === product.category,
                  )?.label;
                  const { image } = product.images[0];
                  return (
                    <li className="flex py-6 sm:py-10" key={product.id}>
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          {typeof image !== 'string' && image.url ? (
                            <Image
                              fill
                              src={image.url}
                              alt={product.name}
                              className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:gird sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-medium text-[#f7e7ce] hover:text-[#f7e7ce]"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                Category: {label}
                              </p>
                            </div>

                            <p className="mt-1 text-sm font-medium text-[#cab28b]">
                              {formatPrice(product.price)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button>
                                <X
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;