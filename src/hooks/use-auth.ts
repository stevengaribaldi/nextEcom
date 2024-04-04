import { headers } from 'next/headers';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';

export const useAuth = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!res.ok) throw new Error();
      toast.success('Logged out successfully');
      router.push('/login');
      router.refresh();
      return
    } catch (err) {
      toast.error('Failed to log out');
      return
    }
  };
  return { logOut };
};
