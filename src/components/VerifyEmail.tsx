'use client';

import { trpc } from '@/trpc/client';
import { Loader2, XCircle, MailOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle size={50} className="h-9 text-red-600"></XCircle>
        <h1 className="font-semibold text-2xl h-9 text-gray-300">
          {' '}
          There was a problem
        </h1>
        <p className="text-gray-400 font-extralight text-center ">
          Token is not vaild or has expired. Please try again
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60  w-60 text-muted-foreground">
          <MailOpen className='justify-center items-center mb-4 h-60 w-60' />
        </div>
        <h3 className="font-semibold text-2xl text-white">
          You&apos;re all set!{' '}
        </h3>
        <p className="text-gray-400 font-extralight text-center mt-2">
          Thank you for verifying your email.{' '}
        </p>
        <Link
          href="/login"
          className="hover:ring-1 ring-pink-300 hover:ring-opacity-10
                      hover:shadow-[0_6px_20px_rgba(209,192,208,50%)]
                       px-8 py-2 rounded-md text-pink-200 bg-custom-black  font-extralight text-lg  transition duration-200 ease-linear"
        >
          Log in
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 size={50} className="animate-spin h-9 text-zinc-300"></Loader2>
        <h1 className="font-semibold text-2xl h-9 text-gray-300"> Verifying</h1>
        <p className="text-muted-foreground text-sm text-gray-100">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
};
export default VerifyEmail;
