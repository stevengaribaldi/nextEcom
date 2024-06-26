import MaxWithWrapper from '@/components/MaxWidthWrapper';
import AddToCartButton from '@/components/ui/AddToCartButton';
import ImageSlider from '@/components/ui/ImageSlider';
import ProductReel from '@/components/ui/ProductReel';
import { PRODUCT_CATEGORIES } from '@/config';
import { getPayloadClient } from '@/get-payload';
import { formatPrice } from '@/lib/utils';
import { Check, Shield } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMBS = [
  {
    id: 1,
    name: 'Home',
    href: '/',
  },
  {
    id: 1,
    name: 'Products',
    href: '/products',
  },
];

const Page = async ({ params }: PageProps) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  });

  const [product] = products;
  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <MaxWithWrapper className="bg-custom-black">
      <div className="bg-custom-black">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex sm:-mt-5 items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm  text-[#c9af3d] hover:text-orange-400"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-[#c09318]"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-3 text-[#faebd7]">
              <h1 className=" text-2xl font-bold tracking-tight sm:text-4xl text-champagne-b   ">
                {product.name}
              </h1>
            </div>
            <div className="mt-2 lg:col-start-2 lg:row-span-1 lg:mt-10 lg:self-center">
              <div className="aspect-square  sm:w-full justify-center items-center  rounded-lg">
                <ImageSlider urls={validUrls} />
              </div>
            </div>
            <section className="mt-3">
              <div className="flex items-center ">
                <p className="font-medium text-champagne-b ">
                  {formatPrice(product.price)}
                </p>

                <div className="ml-4 border-l  text-champagne-b  border-orange-300 pl-4">
                  {label}
                </div>
              </div>
              <div className="mt-1 space-y-6 ">
                <p className="text-base  text-white ">
                  {product.description}
                </p>
              </div>
              <div className="mt-6  flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5  flex-shrink-0 text-lime-300"
                ></Check>
                <p className="ml-2 text-sm text-muted-foreground">
                  Instant Delivery
                </p>
              </div>
            </section>
          </div>
          <div className="mt-5 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-4">
                <AddToCartButton product={product}></AddToCartButton>
              </div>
            </div>
            <div className=" mt-5 sm:mt-10 text-center">
              <div className="group inline-flex text-sm text-medium">
                <Shield
                  //   aria-hidden="true"
                  className="mr-2 h-5 flex-shrink-0 text-teal-300"
                />
                <span className="text-muted-foreground text-teal-400">
                  30 day return Guarantee{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 -mt-10">
        <ProductReel
          href="/products"
          query={{ category: product.category, limit: 4 }}
          title={'Frequently bought together'}
        />
      </div>
    </MaxWithWrapper>
  );
};
export default Page;
