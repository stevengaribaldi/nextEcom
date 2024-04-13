'use client';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/payload-types';

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);
  return (
    <div>
      <Button
        onClick={() => {
          addItem(product);
          setIsSuccess(true);
        }}
        size="lg"
        className="w-full shadow-[0_6px_20px_rgba(209,192,208,50%)] font-semibold ring-1 ring-[#d5e2c4] ring-opacity-10 bg-[#d1c0d0a0] hover:bg-[#d1c0d0a0] text-white px-10 py-2 rounded-md  transition duration-200 ease-linear lg:flex lg:flex-1  hover:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset]  text-2xl  hover:ring-0"
      >
        {isSuccess ? 'Added!' : 'Add To Cart'}{' '}
      </Button>
    </div>
  );
};

export default AddToCartButton;
