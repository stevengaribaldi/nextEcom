import MaxWithWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWithWrapper >
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-grey-900 sm:text-6xl">The Market Place
          <span className="text-blue-600"> digital assests</span>.
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">Verified Digital™ </p>
        <div className="flex flex-col sm:flow-row gap-4 mt-6">

        <Link href="/products" className={buttonVariants()}>  Browser Trending</Link>
        <Button variant='ghost'>Our quality promise &rarr;</Button>
      </div>
        </div>

    </MaxWithWrapper>
  );
}
