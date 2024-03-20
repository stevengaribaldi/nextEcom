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
            <VerifyEmail />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center space-y-1">
            {/* <div className="relative mb-4 h-35 w-35 text-muted-foreground">
              <Image src="/" fill alt="email sent image" />
            </div> */}
            <h3 className="font-semibold text-2xl text-white ">
              Check your email
            </h3>
            {toEmail ? (
              <p className=" text-center  text-gray-200 text-muted-foreground">
                We&apos;ve sent a verification link to{' '}
                <span className="font-semibold text-sky-500">{toEmail}</span>
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
