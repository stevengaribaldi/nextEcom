'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@/payload-types';
import { Skeleton } from './skeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/config';
import { formatPrice } from '../../lib/utils';
import ImageSlider from './ImageSlider';
import { boolean } from 'zod';

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisable, setIsVisable] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisable(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisable) return <ProductPlaceHolder />;
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  const vaildUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisable && product) {
    return (
      <Link
        className={cn('invisible h-full w-full cursor-pointer group/main', {
          'visible animate-in fade-in-5': isVisable,
        })}
        href={`/product/${product.id}`}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={vaildUrls} />
          <h3 className="mt-4 font-medium text-sm text-white">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-custom-fontgreen">{label} </p>
          <p className="mt-1 font-medium text-sm text-[#3d6f2b]">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

const ProductPlaceHolder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-slate-950 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className=" h-full w-full bg-gray-900"></Skeleton>
      </div>
      <Skeleton className=" mt-4 w-2/3 h-4 bg-gray-950 rounded-lg"></Skeleton>
      <Skeleton className=" mt-2 w-16 h-4  bg-gray-950 rounded-lg"></Skeleton>
      <Skeleton className=" mt-2 w-12 h-4  bg-gray-950 rounded-lg"></Skeleton>
    </div>
  );
};
export default ProductListing;
