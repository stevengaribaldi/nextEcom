'use client';
import { TQueryValidator } from '@/lib/validators/query-validator';
import { Product } from '@/payload-types';
import { trpc } from '@/trpc/client';
import Link from 'next/link';
import ProductListing from './ProductListing';

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}
const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      },
    );
  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];
  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-pale-gold sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <h2 className="mt-2 text-[#fff4c4] text-sm ">
              {subtitle}
            </h2>
          ) : null}
        </div>
        {href ? (
          <Link
            href={href}
            className="mt-4 bg-custom-black no-underline group cursor-pointer items-center relative rounded-full p-px text-sm font-semibold text-[#e5deca] hover:text-[#fffdd0] inline-block"
            style={{ width: 'auto', marginRight: '20px' }}
          >
            <span className="absolute inset-0 overflow-hidden rounded-full flex justify-center">
              <span
              // className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-5 transition-opacity duration-500 group-hover:opacity-100"
              />
            </span>
            <div className="font-light relative flex space-x-2 justify-center items-center z-10 rounded-full bg-custom-black py-0.5 px-4 ring-gray/10">
              Browse collection
              <svg
                className="animate-pulse text-gray-100 duration-2500"
                fill="none"
                height="16"
                viewBox="0 -2 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-amber-100/0 via-amber-100/90 to-amber-100/0 transition-opacity duration-500 group-hover:opacity-40" />
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {map.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
