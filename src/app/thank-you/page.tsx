import { getServerSideUser } from '@/lib/payload-utils';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getPayloadClient } from '@/get-payload';
import { notFound, redirect } from 'next/navigation';
import { Product, ProductFile } from '@/payload-types';
import { PRODUCT_CATEGORIES } from '@/config';
import { ArrowDownToLine, Download } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ThankyouPage = async ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();
  console.log(payload);

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: { equals: orderId },
    },
  });

  const [order] = orders;
  if (!order) return notFound();
  const orderUserId =
    typeof order.user === 'string' ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/login?origin=thank-you?orderId=${order.id}`);
  }

  const products = order.products as Product[];

  const ordertotal = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  return (
    <main className="flex flex-col items-center -mt-32 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 py-16 overflow-hidden rounded-lg text-center"></div>
      <div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          {/* <!-- <div className="lg:col-start-2 space-y-6"> --> */}
          {/* Left column for order details */}
          <div className="space-y-6 flex flex-col">
            <p className=" text-6xl text-champagne-b">Thank you</p>

            {order._isPaid ? (
              <p className="mt-2 text-base font-light text-[#aabab4]  ">
                Your order was processed and your assets are available to
                download below. We&apos;ve sent your receipt and order details
                to
                {typeof order.user !== 'string' ? (
                  <span className=" font-medium text-white ">
                    {` ${order.user.email}`}
                  </span>
                ) : null}
              </p>
            ) : (
              <p className="mt-2 text-base text-green-100">
                We appreciate your business, and we&apos;re currently processing
                your order. You will receive an email with your order details
                shortly.
              </p>
            )}
            <div className="mt-16 text-medium font-medium">
              <div className=" text-gray-300">Order#</div>
              <div className="mt-0 text-gray-300">{order.id}</div>
            </div>

            <ul className="mt-6 divide-y  divide-slate-700 border-t border-gray-200 text-sm font-medium text-muted-foreground">
              {(order.products as Product[]).map((product) => {
                const label = PRODUCT_CATEGORIES.find(
                  ({ value }) => value === product.category,
                )?.label;

                const downloadUrl = (product.product_files as ProductFile)
                  .url as string;

                const { image } = product.images[0];

                return (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <div className="relative h-32 w-32">
                      {typeof image !== 'string' && image.url ? (
                        <Image
                          fill
                          src={image.url}
                          alt={`${product.name} image`}
                          className="flex-none rounded-md bg-slate-900 object-cover object-center "
                        />
                      ) : null}{' '}
                    </div>
                    <div className="flex-auto flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-[#fff8e7] ">{product.name}</h3>
                        <p className="my-1">Category: {label}</p>
                      </div>
                      {order._isPaid ? (
                        <a
                          href={downloadUrl}
                          download={product.name}
                          className="flex items-center  mt-12 text-sky-400  hover:underline underline-offset-1 space-x-2"
                        >
                          <h1 className="text-sky-400 ">Download</h1>
                          <ArrowDownToLine className="w-5 h-5 " />{' '}
                          {/* Adjust size as needed */}
                        </a>
                      ) : null}
                    </div>
                    <p className="flex-none font-medium text-gray-200">
                      {formatPrice(product.price)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="space-y-6 flex flex-col  flex-1  pt-600 text-sm font-medium text-muted-foreground">
            <h1 className=" flex flex-col  col-span-1 text-4xl font-medium text-[#d5e2c4]">
              Order Successful
            </h1>
            <div className="flex justify-between">
              <p> Subtotal</p>
              <p>{formatPrice(ordertotal)}</p>
            </div>

            <div className="flex justify-between">
              <p> Transaction Fee</p>
              <p>{formatPrice(1)}</p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <p className="text-base">Total</p>
              <p className="text-base"> {formatPrice(ordertotal + 1)}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankyouPage;
