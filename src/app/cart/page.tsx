'use client';
import { Button } from '@/components/ui/button';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { PRODUCT_CATEGORIES } from '@/config';
import { useCart } from '@/hooks/use-cart';
import { cn, formatPrice } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { Check, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { router } from '../../trpc/trpc';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { items, removeItem } = useCart();
  const router = useRouter();
  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });
  const productIds = items.map(({ product }) => product.id);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const itemsCount = items.length;
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  );
  const fee: number = itemsCount <= 0 ? 0 : 1;

  return (
    <div className="bg-custom-black ">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl  font-bold tracking-tight text-[#f5f5dc] sm:text-4xl">
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
                'divide-y  divide-[#564856] border-b border-t border-[#564856]':
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
                    <li
                      className="flex justify-center  py-6 sm:py-10"
                      key={product.id}
                    >
                      <div className="flex-shrink-0">
                        <div className="relative h-48 w-48">
                          {typeof image !== 'string' && image.url ? (
                            <Link href={`/product/${product.id}`}>
                              <Image
                                fill
                                src={image.url}
                                alt={product.name}
                                className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                              />
                            </Link>
                          ) : null}
                        </div>
                        <Link href={`/product/${product.id}`} />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:gird sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-medium text-pink-50 text-3xl hover:text-[#f8dfb6]"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <Link href={`/product/${product.id}`}>
                              <div className="mt-1  flex text-sm">
                                <p className=" flex flex-row text-2xl  text-purple-50 "></p>
                                <p className="italic">Category:</p>
                                <p className=" ml-2">{label}</p>
                              </div>
                            </Link>

                            <Link href={`/product/${product.id}`}>
                              <p className="mt-1 text-lg font-medium text-violet-50">
                                {formatPrice(product.price)}
                              </p>
                            </Link>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => removeItem(product.id)}
                                className="hover:bg-red-500 hover:text-dark-brown text-white"
                              >
                                <X className="h-5 w-5" aria-hidden="true" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Link href={`/product/${product.id}`}>
                          <button className=" h-20 w-full  mt-0 -mb-0 bottom-0">
                            <p className="mt-10 flex space-x-2 text-medium text-neutral-400 ">
                              <Check className="h-5 w-5  flex-shrink-0  text-green-500" />
                              <span>Instant Delivery </span>
                            </p>
                          </button>
                        </Link>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <section className="mt-16 rounded-lg text-xl text-slate-300   bg-[#5648562e] px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2>Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-lg mt-5 text-slate-300">Subtotal</p>
                <p className="text-sm font-medium ">
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Image
                      src="/8wheel.svg"
                      alt={''}
                      width={60}
                      height={60}
                      className="animate-spin mt-5 text-muted-foreground"
                    />
                  )}
                </p>
              </div>
              <div className="justify-between border-t border-gray-600">
                <div className="flex items-center justify-between">
                  <p className="text-lg mt-5 text-slate-300">fee</p>
                  <p className="text-sm  mt-5 font-medium text-slate-300">
                    {isMounted ? (
                      formatPrice(fee)
                    ) : (
                      <Image
                        src="/8wheel.svg"
                        alt={''}
                        width={60}
                        height={60}
                        className="animate-spin mt-1 text-muted-foreground"
                      />
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-600 pt-4 ">
                <div className="font-medium text-2xl text-slate-50">
                  Order Total
                </div>
                <div className="text-base font-medium text-slate-50">
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Image
                      src="/8wheel.svg"
                      alt={''}
                      width={60}
                      height={60}
                      className="animate-spin mt-1 text-muted-foreground"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                disabled={itemsCount === 0 || isLoading || !isMounted}
                onClick={() => createCheckoutSession({ productIds })}
                className={cn(
                  'relative group/btn w-full justify-center items-center  rounded-md h-10 font-medium  ]',
                  itemsCount > 0 && isMounted
                    ? 'shadow-[0_6px_20px_rgba(209,192,208,50%)] glow-on-hover ring-1 ring-[#d5e2c4] ring-opacity-10 bg-[#d1c0d0a0] hover:bg-[#d1c0d0a0] text-white px-10 py-2 rounded-md font-normal transition duration-200 ease-linear lg:flex lg:flex-1  hover:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset]  text-lg  hover:ring-0'
                    : null,
                  //  hover:shadow-[0_6px_20px_rgba(230,225,211,10%)]
                )}
              >
                {isLoading ? (
                  <Image
                    src="/8wheel.svg"
                    alt={''}
                    width={60}
                    height={60}
                    className="animate-spin mt-1 text-muted-foreground"
                  />
                ) : null}
                {/* // '  hover:shadow-[0_6px_20px_rgba(209,192,208,30%)] hover:-translate-y-0.3 bg-slate-950 bg-gradient-to-r from-slate-800/0 via-slate-800/90  hover:via-stone-800/90 to-slate-800/0 transition-opacity duration-500 group-hover:opacity-40   hover:ring-2 hover:ring-opacity-30 hover:ring-slate-800' */}

                <TextGenerateEffect
                  words="Checkout"
                  textColor="#fae8ff"
                  isValid={isMounted}
                  className="font-bold text-lg"
                />
                {itemsCount > 0 && isMounted ? <BottomGradient /> : null}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
const BottomGradient = () => {
  return (
    <>
      <span className="block duration-500 absolute h-px w-full shadow-[0_6px_50px_rgba(209,192,208,100%)]  -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
      <span className="blur-sm block transition duration-500 absolute h-px w-1/2 mx-auto -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
    </>
  );
};
