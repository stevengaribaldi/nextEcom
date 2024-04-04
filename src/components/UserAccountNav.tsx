'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
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
  const { logOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <button
          className="hover:ring-1   ring-pink-300 hover:ring-opacity-10
                      hover:shadow-[0_6px_20px_rgba(0,118,255,5%)] mr-8
                       px-8 py-2 rounded-md text-pink-100  relative  font-extralight text-lg  transition duration-200 ease-linear"
        >
          My Account
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-gray-800 text-white" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              {/* <UserIcon className="mr-2 h-4 w-4" /> */}
              <span className="font-medium text-sm">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LayoutDashboard></LayoutDashboard>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex  space-y-0.5 leading-none">
              <Link href="/sell">Seller Dashboard </Link>
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
