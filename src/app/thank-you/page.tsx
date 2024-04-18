import Image from 'next/image';
const ThankyouPage = () => {
  return (
    <main className="relative lg:min-h-full">
      <div className="h-80 w-auto overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/thankyou.png"
          className="h-full w-full object-cover object-center"
          alt="Thank you for your order"
        />
        <p className="text-center">Thank you for your order</p>
      </div>
    </main>
  );
};

export default ThankyouPage;
