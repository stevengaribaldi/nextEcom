'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@/payload-types';
import { Skeleton } from './skeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/config';
import { formatPrice } from '../../lib/utils';
import ImageSlider from './ImageSlider';

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);
    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceHolder />;
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <>
        <Link
          className={cn('invisible h-full w-full cursor-pointer group/main', {
            'visible animate-in fade-in-5': isVisible,
          })}
          href={`/product/${product.id}`}
        >
          <div className="flex flex-col w-full">
            <ImageSlider urls={validUrls} />
            <h3 className="mt-3 font-medium text-sm text-champagne-b">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-champagne-b">{label} </p>
            <p className="mt-1 font-medium text-sm text-champagne-b">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
      </>
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
