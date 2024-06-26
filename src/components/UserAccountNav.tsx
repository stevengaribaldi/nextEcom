'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import React, { useState, useRef } from 'react';

import { User } from '@/payload-types';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { toast, Toaster } from 'sonner';
import { LogOut, User as UserIcon, Tag } from 'lucide-react';

const UserAccountNav = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { logOut } = useAuth();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <div
          className="hover:ring-1 ring-pink-300 hover:ring-opacity-10
                      hover:shadow-[0_6px_20px_rgba(209,192,208,50%)]
                       px-8 py-2 rounded-md text-pink-200 bg-custom-black font-extralight text-lg  transition duration-200 ease-linear"
        >
          <div className="flex ">
            <UserIcon
              className="cursor-pointer"
            ></UserIcon>
            <span className=" space-y-0.5 cursor-pointer  px-1 py-1 leading-none">
              My Account
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 bg-[#09120e]  text-amber-100"
        align="end"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <DropdownMenuLabel>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col text-[#fad6a5] space-y-0.5 leading-none">
              {/* <UserIcon className="mr-2 h-4 w-4" /> */}
              <span className="font-medium text-sm">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        {/* 36454F 203e4a bfafb2 */}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="hover:bg-slate-950">
          <Tag></Tag>
          <div className="flex items-center  justify-start gap-2 p-2">
            <div className="flex  space-y-0.5 leading-none">
              <Link href="/sell">Sell </Link>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={logOut} className="cursor-pointer">
          <LogOut></LogOut>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex  space-y-0.5 leading-none">Log Out</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserAccountNav;
