import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextRequest } from 'next/server';
import { User } from '../payload-types';
export const getSererSideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies,
) => {
  const token = cookies.get('payload-token')?.value;
  const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    headers: { Authorization: `JWT ${token}` },
  });

  const { user } = (await meRes.json()) as { user: User };
};
