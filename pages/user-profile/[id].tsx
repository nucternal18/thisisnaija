import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout, UserProfile } from "../../components";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../../utils/data";
import { client } from "../../lib/client";
import {  Spinner } from "../../components";
import { PinDetails, User } from "../../lib/types";
const randomImage =
  "https://source.unsplash.com/random/1600x900/?technology,coder-setup,code";

function Profile({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [pins, setPins] = useState<PinDetails[]>([]);
  const [text, setText] = useState<string>("Created");
  const [activeBtn, setActiveBtn] = useState<string>("created");
    
  useEffect(() => {
    const query = userQuery(id);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [id]);

  useEffect(() => {
    if (text === "created") {
        const createdPinsQuery = userCreatedPinsQuery(id);
        client.fetch(createdPinsQuery).then((data) => {
            setPins(data);
        })
    } else {
         const savedPinsQuery = userSavedPinsQuery(id);
         client.fetch(savedPinsQuery).then((data) => {
           setPins(data);
         });
    }
  }, [text, id]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  if (!user) {
    return <Spinner message="Loading profile" />;
  }

  return (
    <Layout>
      <UserProfile
        randomImage={randomImage}
        user={user}
        userId={id}
        pins={pins}
        handleLogout={handleLogout}
        setText={setText}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
      />
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

export default Profile;
