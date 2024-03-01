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
const perks = [
  {
    name: 'Instant Download',
    Icon: ArrowDownToLine,
    description:
      'Get your Verified Digital™ assets delivered instantly to your email.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description: 'All assests are verified by industry experts. ',
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
      <MaxWithWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-grey-900 sm:text-6xl">
            The Market Place
            <span className="text-blue-600"> digital assests</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Verified Digital™{' '}
          </p>
          <div className="flex flex-col sm:flow-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              {' '}
              Browser Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
        {/* TODO list products */}
      </MaxWithWrapper>
      <section className="border-t border-gray-200 bg-gray-50 ">
        <MaxWithWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:item-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
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
