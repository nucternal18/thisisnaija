import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { client } from "../../lib/client";
import { pinDetailMorePinQuery, pinDetailQuery } from "../../utils/data";
import { useFetchUser } from "../../lib/useFetchUser";

// Components
import Layout from "../../components/Layout";
import { PinDetails as PinDetailsComp } from "../../components";
import { Spinner } from "../../components";
import { PinDetails } from "../../lib/types";

function PinDetails({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [pins, setPins] = useState<any[]>([]);
  const [pinDetails, setPinDetails] = useState<PinDetails>(null);
  const [comment, setComment] = useState<string>("");
  const [addingComment, setAddingComment] = useState<boolean>(false);

  const { user } = useFetchUser();
  const fetchPinDetails = () => {
    let query = pinDetailQuery(id);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetails(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((data) => {
            setPins(data);
          });
        }
      });
    }
  };

  useEffect(() => {
      fetchPinDetails();
  },[id])

  const addComment = () => {
    if(comment){
      setAddingComment(true);

      client
      .patch(id)
      .setIfMissing({ comments: []})
      .insert('after', 'comments[-1]', [{
        comment,
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
      }])
      .commit()
      .then(() =>{
        fetchPinDetails();
        setComment('');
        setAddingComment(false);
      })

    }
  }

  return (
    <Layout user={user}>
      {!pinDetails ? (
        <Spinner message="Loading pin details..." />
      ) : (
        <PinDetailsComp user={user} pins={pins} pinDetails={pinDetails} comment={comment} setComment={setComment} addingComment={addingComment} addComment={addComment} />
      )}
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

export default PinDetails;
