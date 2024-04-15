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
import { Toaster, toast } from 'sonner';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Log in instead?');

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error('Something went wrong. Please try again.');
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push('/verify-email?to=' + sentToEmail);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
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
              Create an account
            </h1>
            <Link href="/login">
              <button className="mt-4 bg-custom-black no-underline group cursor-pointer  items-center relative w-full rounded-full p-px text-lx font-semibold leading-9  text-gray-300 hover:text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full flex justify-center">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-5 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className=" relative flex space-x-2 justify-center items-center z-10 rounded-full bg-custom-black py-0.5 px-4 ring-gray/10 ">
                  <span> Already have an account? log in</span>
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
            <Toaster position="top-center" richColors />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" -mt-1 grid gap-2 ">
                <div className="grid gap-1 py-2">
                  <div className="max-w-md  bg-[#2c242c] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input ">
                    <LabelInputContainer className="mb-4  ">
                      <Label className="" htmlFor="email">
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
                      <Label htmlFor="password">Password</Label>
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
                      disabled={isLoading}
                      className={cn(
                        'relative group/btn w-full  bg-black rounded-md h-10 font-medium  shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_0px_1px_0px_var(--zinc-800)_inset]',

                        isValid &&
                          '  hover:bg-slate-950  hover:bg-gradient-to-r hover:from-cyan-950/0 hover:via-cyan-950/90 hover:to-cyan-950/0 hover:transition-opacity duration-500 group-hover:opacity-40   hover:ring-1 hover:ring-opacity-10 hover:ring-cyan-100',
                      )}
                      type="submit"
                    >
                      <TextGenerateEffect
                        words="Create Account"
                        isValid={isValid}
                        className="your-custom-class"
                      />

                      {isValid && <BottomGradient />}
                    </button>
                  </div>
                </div>
              </div>
            </form>
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
