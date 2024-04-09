import { trpc } from '@/trpc/client';
import Link from 'next/link';

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
}

const ProductReel = (props: ProductReelProps) => {
    const { title, subtitle, href } = props;

    const {}= trpc.

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-pink-100 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-pink-300 text-sm text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-cyan-500 hover:text-cyan-300 md:block"
          >
            Browse collection
            <span
              aria-hidden="true"
              className="animate-pulse text-cyan-600 duration-2500 "
            >
              &rarr;
            </span>
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
                  <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
