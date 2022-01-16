import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";

import { MasonryLayout, Spinner } from ".";
import { searchQuery, feedQuery } from "../utils/data";
const Feed = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pins, setPins] = useState<any[]>(null);

  useEffect(() => {
    setLoading(true);
    client.fetch(feedQuery).then((data) => {
      setPins(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  return <div>{pins && pins.length > 0 && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
