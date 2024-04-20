import MaxWithWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  ArrowDownToLine,
  CheckCircle,
  FingerprintIcon,
  Headset,
  Leaf,
  Undo2,
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../components/ui/separator';
import ProductReel from '@/components/ui/ProductReel';

const perks = [
  {
    name: 'Instant Download',
    Icon: ArrowDownToLine,
    description:
      'Get your  Yehfedra Digital™ assets delivered instantly to your email.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description: 'All assets are verified by industry experts. ',
  },
  {
    name: 'Secure Transactions',
    Icon: FingerprintIcon,
    description:
      'We use the latest in encryption technology to ensure your transactions are secure and private',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've partnered with One Tree Planted to plant a tree for every purchase made on our platform.",
  },
  {
    name: 'Support 24/7',
    Icon: Headset,
    description:
      'Our team is available 24/7 to help you with any questions or concerns you may have.',
  },
  {
    name: '30 Day Refund Guarantee',
    Icon: Undo2,
    description: 'Not happy? We offer our 30 day refund guaranteed.',
  },
];

export default function Home() {
  return (
    <>
      <>
        {/* <Separator /> */}
        <section className=" bg-custom-black">
          <div className="bg-custom-black -mx-96 ">
            <MaxWithWrapper className="">
              <section>
                <div className="bg-custom-black -mx-96 ">
                  <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className="text-4xl tracking-tight font-light text-[#effaf7] sm:text-6xl ">
                      The Marketplace For <br />
                      <span className="text-rose-100  font-bold">
                        {' '}
                        Digital Assets
                      </span>
                    </h1>
                    <p className="mt-6  max-w-prose text-[#bdeade] text-lg">
                      Yehfedra Digital™{' '}
                    </p>
                    <div className="flex flex-col sm:flow-row gap-4 mt-6 ">
                      <Link
                        href="/products"
                        className={
                          (buttonVariants(),
                          'shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset] lg:flex lg:flex-1 lg:items-center text-lg lg:justify-end lg:space-x-6  hover:bg-slate-800 bg-slate-900  hover:shadow-[0_6px_20px_rgba(196,204,188,5%)]  hover:ring-1 ring-slate-700 hover:ring-opacity-10  px-10 py-2  rounded-md text-amber-100 font-extralight justify-center transition duration-200 ease-linear')
                        }
                      >
                        Browse Trending
                      </Link>
                      <Button
                        className=" bg-accent text-[accent]-foreground font-extralight text-lg shadow-[0px_1px_0px_0px_var(--white)_inset,0px_0px_1px_0px_var(--white)_inset]"
                        variant="ghost"
                      >
                        Our quality promise &rarr;
                      </Button>
                    </div>
                  </div>
                </div>
                {/* TODO list products */}
                <ProductReel
                  query={{ sort: 'desc', limit: 4 }}
                  title="New Arrivals"
                  subtitle="Animations"
                  href="/products"
                />
              </section>
            </MaxWithWrapper>
          </div>
        </section>
      </>
      <section className="border-t border-custom-black bg-custom-black">
        <MaxWithWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:item-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#8aa79d]  text-black">
                    {<perk.Icon className="w-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base  text-[#a8ac92]">{perk.name}</h3>
                  <p className="mt-3 text-sm  text-[#769484]">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWithWrapper>
      </section>
    </>
  );
}
