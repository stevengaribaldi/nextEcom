import { NextRequest } from 'next/server';
import { User } from '../payload-types';

export const getServerSideUser = async (cookies: NextRequest['cookies']) => {
  const token = cookies.get('payload-token')?.value;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const meRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        headers: { Authorization: `JWT ${token}` },
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    if (!meRes.ok) throw new Error('Failed to fetch user data');

    const { user } = (await meRes.json()) as { user: User | null };
    return { user };
  } catch (error) {
    console.error('Failed to get user data:', error);
    throw error;
  }
};
