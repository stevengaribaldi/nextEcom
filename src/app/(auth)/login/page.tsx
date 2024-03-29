'use client';
import React, { useState, useEffect } from 'react';
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
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: logIn, isLoading } = trpc.auth.logIn.useMutation({
    onSuccess: () => {
      toast.success('Logged in successfully');
      router.refresh();
      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push('/sell');
        return;
      }

      router.push('/');
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password');
        return;
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    logIn({ email, password });
  };

  return (
    <>
      <div className="bg-black container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex bg-black w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src="/8wheel.svg"
              alt={''}
              width={200}
              height={200}
              // className="-rotate-180"
            />
            <h1 className="text-2xl text-zinc-500">
              Log in to your account {isSeller ? 'seller' : ''}
            </h1>
            <Link href="/create-account">
              <button className="mt-4 bg-black no-underline group cursor-pointer  items-center relative w-full rounded-full p-px text-lx font-semibold leading-9  text-gray-300 hover:text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full flex justify-center">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-5 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className=" font-light relative flex space-x-2 justify-center items-center z-10 rounded-full bg-black py-0.5 px-4 ring-gray/10 ">
                  <span>Don&apos;t have an account?</span>
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
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" -mt-1 grid gap-2 ">
                <div className="grid gap-1 py-2">
                  <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input ">
                    <LabelInputContainer className="mb-4  ">
                      <Label className=" font-light " htmlFor="email">
                        Email Address
                      </Label>
                      <Input
                        {...register('email', {
                          required: 'Invalid email',
                        })}
                        id="email"
                        placeholder="projectmayhem@example.com"
                        type="email"
                      />
                      {errors?.email && (
                        <p className="text-sm text-red-300">
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
                        // className={cn( {

                        //   'focus-visible:bg-red-900': errors.password,
                        // })}
                        id="password"
                        placeholder="••••••••"
                        type="password"
                      />
                      {errors?.password && (
                        <p className="text-sm text-red-400">
                          {errors.password.message}
                        </p>
                      )}
                    </LabelInputContainer>

                    <button
                      className=" relative group/btn w-full text-white  rounded-md h-10
                      font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset]"
                      type="submit"
                    >
                      <TextGenerateEffect
                        words="Login"
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
                <span className="bg-black px-2 text-muted-foreground ">or</span>
              </div>
            </div>
            {isSeller ? (
              <Button
                className="shadow-[0_4px_14px_0_rgb(0,0,0,1%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear"
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                className="shadow-[0_4px_14px_0_rgb(0,0,0,1%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear"
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}
              >
                Contiune as seller
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
      <span className="block duration-500 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="blur-sm block transition duration-500 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
export default Page;