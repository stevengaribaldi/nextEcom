'use client';
import { PRODUCT_CATEGORIES } from '@/config';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/payload-types';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { Separator } from './ui/separator';

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];

  const { removeItem } = useCart();
  // const label = PRODUCT_CATEGORIES.find(
  //   ({ value }) => value === product.category,
  // )?.label;

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start h- justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex  flex-col">
            <div className="relative aspect-square h-36 w-36 min-w-fit overflow-hidden rounded">
              {typeof image !== 'string' && image.url ? (
                <Image
                  src={image.url}
                  alt={product.name}
                  fill
                  className="absolute  object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-brown-khaki">
                  <ImageIcon
                    aria-hidden="true"
                    className="h-10 text-muted-foreground"
                  />
                </div>
              )}
            </div>
            <div className="mt-2 text-sm px-1 text-muted-foreground">
              <div className="  bg-[#3c0006] inline-block rounded  ">
                <button
                  onClick={() => removeItem(product.id)}
                  className="flex items-center sm:justify-end  hover:text-gray-600  justify-end rounded text-xs font-medium px-2 py-1 "
                >
                  <X className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col self-start">
            {/* <span className="line-clamp-1 text-[#fad6a5] text-sm   font-medium mb-1">
              {product.name}
            </span> */}
            {/* <span className="flex flex-col line-clamp-1 text-xs text-[#fad6a5]  ">
              {label}
            </span> */}
          </div>
        </div>
        <div className="flex flex-col space-y-1 pr-6 text-[#fad6a5] font-medium">
          <span className="ml-auto line-clamp-1  text-[#fad6a5] text-base">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
      <Separator className="bg-muted-foreground" />
    </div>
  );
};
export default CartItem;
