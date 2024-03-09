import Image from 'next/image';
const Page = () => {
  return (
    <>
      <div className="bg-black container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex bg-black w-full flex-col justify-center space-y-6 sm:w-[350px]"></div>
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image
            src="/8wheel.svg"
            alt={''}
            width={200}
            height={200}
            className="-rotate-180  "
          />
        </div>
      </div>
    </>
  );
};

export default Page;
