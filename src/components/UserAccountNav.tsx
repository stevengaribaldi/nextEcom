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

import { Button } from './ui/button';
import { User } from '@/payload-types';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { toast, Toaster } from 'sonner';
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User as UserIcon,
  UserPlus,
  Users,
  Tag,
  LayoutDashboard,
} from 'lucide-react';

const UserAccountNav = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { logOut } = useAuth();
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        className="overflow-visible "
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div
          className="hover:ring-1 ring-pink-300 hover:ring-opacity-10
                      hover:shadow-[0_6px_20px_rgba(209,192,208,50%)]
                       px-8 py-2 rounded-md text-pink-200 bg-custom-black  font-extralight text-lg  transition duration-200 ease-linear"
        >
          <div className="flex ">
            <UserIcon
              className="cursor-pointer"
              onMouseEnter={() => setIsOpen(true)}
            ></UserIcon>
            <span className=" space-y-0.5 cursor-pointer  px-1 py-1 leading-none">
              My Account
            </span>
          </div>
      </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 bg-slate-950 text-pink-100"
        align="end"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        >
        <DropdownMenuLabel>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col text-white space-y-0.5 leading-none">
              {/* <UserIcon className="mr-2 h-4 w-4" /> */}
              <span className="font-medium text-sm">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Tag></Tag>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex  space-y-0.5 leading-none">
              <Link href="/sell">Sell </Link>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={logOut} className="cursor-pointer">
          <LogOut></LogOut>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex  space-y-0.5 leading-none">Log out</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserAccountNav;
