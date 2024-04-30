'use client';
import React from 'react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { Toaster, toast } from 'sonner';
import { ZodError } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const continueAsSeller = () => {
    router.push('?as=seller');
  };

  const continueAsBuyer = () => {
    router.replace('/login', undefined);
    router.refresh();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: logIn, isLoading } = trpc.auth.logIn.useMutation({
    onSuccess: async () => {
      toast.success('Signed in successfully');

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        router.refresh();

        return;
      }

      if (isSeller) {
        router.push('/sell');
        router.refresh();

        return;
      }

      router.push('/');
      router.refresh();
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password.');
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    logIn({ email, password });
  };

  return (
    <>
      <div className="bg-custom-black container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex bg-custom-black w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src="/8wheel.svg"
              alt={''}
              width={200}
              height={200}
              className={` ${isLoading && 'animate-spin'}`}
            />
            <h1 className="text-2xl font-bold text-zinc-500">
              Log in to your account {isSeller ? 'seller' : ''}
            </h1>
            <Link href="/create-account">
              <button className="mt-4 bg-custom-black no-underline group cursor-pointer  items-center relative w-full rounded-full p-px text-lx font-semibold leading-9  text-gray-300 hover:text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full flex justify-center">
                  <span className="" />
                </span>
                {/* absolute inset-0 rounded-full
                bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)]
                opacity-5 transition-opacity duration-500
                group-hover:opacity-100 */}
                <div className=" relative text-sm flex flex-row space-x-2  justify-center items-center z-10 rounded-full bg-custom-black py-0.5 px-4 ring-gray/10 ">

                  <span className="">Don&apos;t have an account?</span>
                  <span className="text-blue-300"> Create Account</span>
                  <svg
                    className="animate-pulse text-gray-100 duration-2500 "
                    fill="none"
                    height="16"
                    viewBox="0 -2 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className=" absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-400/0 via-blue-400/90 to-blue-400/0 transition-opacity duration-500 group-hover:opacity-40 " />
              </button>
            </Link>
          </div>
          <Toaster position="top-center" richColors />
          <div className="grid gap-6">
            {' '}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2 ">
                  <div className="max-w-md  bg-[#2c242c] w-full mx-auto rounded-sm p-8  ring ring-blue-900 ring-opacity-30">
                    <LabelInputContainer className="mb-4  ">
                      <Label className=" font-light " htmlFor="email">
                        Email Address
                      </Label>
                      <Input
                        {...register('email', {
                          required: 'Invalid email',
                        })}
                        className={cn({
                          'focus-visible:bg-red-900': errors.email,
                          'bg-[#130f13]': !errors.email,
                        })}
                        id="email"
                        placeholder="projectmayhem@example.com"
                        type="email"
                      />
                      {errors?.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                      <Label className=" font-light" htmlFor="password">
                        Password
                      </Label>
                      <Input
                        {...register('password', {
                          required: 'Password is required.',
                        })}
                        className={cn({
                          'focus-visible:bg-red-900': errors.password,
                          'bg-[#130f13]': !errors.email,
                        })}
                        id="password"
                        placeholder="••••••••"
                        type="password"
                      />
                      {errors?.password && (
                        <p className="text-sm text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </LabelInputContainer>

                    <button
                      disabled={isLoading}
                      className={cn(
                        'relative group/btn w-full  rounded-md h-10 font-medium  ',

                        isValid &&
                          ' relative group/btn w-full  rounded-md h-10 font-medium   hover:shadow-[0_6px_20px_rgba(209,192,208,20%)] hover:-translate-y-0.3 bg-slate-950 bg-gradient-to-r from-slate-800/0 via-slate-800/90 hover:via-sky-800/90 to-slate-800/0 transition-opacity duration-500 group-hover:opacity-40   hover:ring-1 hover:ring-opacity-10 hover:ring-cyan-100',
                      )}
                      type="submit"
                    >
                      <TextGenerateEffect
                        words={`Log in`}
                        textColor="#fce7f3"
                        isValid={isValid}
                        className="font-bold text-lg"
                      />
                      {isValid && <BottomGradient />}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-custom-black px-2 text-muted-foreground ">
                  or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button
                className=" relative group/btn w-full text-[#fafafa]  text-lg rounded-md h-10 font-medium hover:bg-slate-950  hover:shadow-[0_6px_20px_rgba(209,192,208,20%)] hover:-translate-y-0.3 bg-slate-950 bg-gradient-to-r from-slate-800/0 via-slate-800/90 hover:via-sky-800/90 to-slate-800/0 transition-opacity duration-500 group-hover:opacity-40   hover:ring-1 hover:ring-opacity-10 hover:ring-cyan-100"
                onClick={continueAsBuyer}
                // variant="secondary"
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                className=" relative group/btn w-full text-[#fafafa]  text-lg rounded-md h-10 font-medium hover:bg-slate-950  hover:shadow-[0_6px_20px_rgba(209,192,208,20%)] hover:-translate-y-0.3 bg-slate-950 bg-gradient-to-r from-slate-800/0 via-slate-800/90 hover:via-sky-800/90 to-slate-800/0 transition-opacity duration-500 group-hover:opacity-40   hover:ring-1 hover:ring-opacity-10 hover:ring-cyan-100"
                onClick={continueAsSeller}
                // variant="secondary"
                disabled={isLoading}
              >
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="block duration-1000 absolute h-px w-full shadow-[0_6px_20px_rgba(209,192,208,50%)]  -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-900 to-transparent" />
      <span className="blur-sm block transition duration-500 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-900 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full ', className)}>
      {children}
    </div>
  );
};
export default Page;
