import { User } from '@/payload-types';
import Navbar from '../components/Navbar';
import { getServerSideUser } from '../lib/payload-utils';

export async function getServerSideProps(context: { req: any }) {
  const { req } = context;
  const nextCookies = req.cookies;
  const user = await getServerSideUser(nextCookies);

  return {
    props: { user },
  };
}

function PageComponent({ user }: { user: User | null }) {
  return (
    <>
      <Navbar user={user} />
    </>
  );
}

export default PageComponent;
