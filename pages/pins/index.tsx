import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Feed, CreatePin, Search } from "../../components";

import { client } from "../../lib/client";
import { userQuery } from "../../utils/data";

import { User } from "../../lib/types";


function Pins() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const userInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <Layout user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <Feed />
    </Layout>
  );
}

export default Pins;
