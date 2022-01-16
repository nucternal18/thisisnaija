import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import { MasonryLayout, Spinner } from "../../../components";
import Layout from "../../../components/Layout";
import { client } from "../../../lib/client";
import { useFetchUser } from "../../../lib/useFetchUser";
import { feedQuery, searchQuery } from "../../../utils/data";

function Category({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [pins, setPins] = useState<any[]>([]);
  const { user } = useFetchUser();

  useEffect(() => {
    setLoading(true);
    if (id) {
      const query = searchQuery(id);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [id]);
   if (loading)
     return <Spinner message="Looking for items in the ${id} category to add your feed!" />;
  return (
    <Layout user={user}>
      {pins && pins.length > 0 && <MasonryLayout pins={pins} />}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  return {
    props: {
      id,
    },
  };
};

export default Category;
