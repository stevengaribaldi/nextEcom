import Image from 'next/image';
import VerifyEmail from '@/components/VerifyEmail';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px:0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-0 sm:w-[350px]">
        {token && typeof token === 'string' ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center space-y-1">
            <div className="mb-4 h-60 w-60 text-muted-foreground relative ">
              <Image
                src="/closeEmail.png"
                fill
                alt="email sent image"
                objectFit="cover"
              />
            </div>
            <h3 className="font-semibold text-2xl text-white ">
              Check your email
            </h3>
            {toEmail ? (
              <p className=" text-center text-gray-400 font-extralight ">
                We&apos;ve sent a verification link to{' '}
                <span className="text-xl text-pink-100">{toEmail}</span>
              </p>
            ) : (
              <span className="text-center text-muted-foreground">
                We&apos;ve sent a verification link to your email.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
