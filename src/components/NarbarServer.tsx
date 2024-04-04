import Navbar from '../components/Navbar';
import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';

const NarbarServer = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <>
      <Navbar user={user} />
    </>
  );
};

export default NarbarServer;
