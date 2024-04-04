// PageComponent.js
import Navbar from '../components/Navbar';
import { getServerSideUser } from '../lib/payload-utils';

export async function getServerSideProps(context) {
  const { req } = context;
  // Access cookies from the request
  const nextCookies = req.cookies;
  // Fetch user data based on cookies
  const user = await getServerSideUser(nextCookies);

  // Pass user data as props to the page
  return {
    props: { user },
  };
}

function PageComponent({ user }) {
  return (
    <>
      <Navbar user={user} />
      {/* Other components */}
    </>
  );
}

export default PageComponent;
