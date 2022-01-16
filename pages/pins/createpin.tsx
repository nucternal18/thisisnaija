import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { client } from "../../lib/client";
import { CreatePin } from "../../components";
import Layout from "../../components/Layout";
import { useFetchUser } from "../../lib/useFetchUser";

function createPin() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState<boolean>(false);

  const { user } = useFetchUser();

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/gif" ||
      type === "image/jpeg"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image upload error: ", error);
        });
    } else {
      setWrongImageType(true);
    }
  };
  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: "postedBy",
          _ref: user?._id,
        },
        category,
      };
      client.create(doc).then((document) => {
        router.push("/pins");
      });
    } else {
      setFields(true);

      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <Layout user={user}>
      <CreatePin
        title={title}
        about={about}
        destination={destination}
        fields={fields}
        loading={loading}
        wrongImageType={wrongImageType}
        imageAsset={imageAsset}
        uploadImage={uploadImage}
        setImageAsset={setImageAsset}
        setTitle={setTitle}
        setAbout={setAbout}
        setDestination={setDestination}
        user={user}
        setCategory={setCategory}
        savePin={savePin}
      />
    </Layout>
  );
}

export default createPin;
