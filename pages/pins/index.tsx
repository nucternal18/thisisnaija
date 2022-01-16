import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Feed } from "../../components";

import { User } from "../../lib/types";
import { useFetchUser } from "../../lib/useFetchUser";

function Pins() {
  const router = useRouter();

  const { user } = useFetchUser();

  // if(!user) {
  //   router.push("/");
  // }

  return (
    <Layout user={user}>
      <Feed />
    </Layout>
  );
}

export default Pins;
