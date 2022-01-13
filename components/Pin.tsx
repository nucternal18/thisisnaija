import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { urlFor, client } from "../lib/client";
import { CloseButton } from "react-toastify/dist/components";
import { fetchUser } from "../lib/fetchUser";

const Pin = ({ pin }) => {
  const { postedBy, image, _id, destination, save } = pin;
  const router = useRouter();
  const [pinHovered, setPinHovered] = useState(false);

  const user = fetchUser();
  const alreadySaved: boolean = !!save?.filter(
    (item) => item.postedBy._id === user.googleId
  )?.length;

  const savePin = async (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          router.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      router.reload();
    });
  };

  return (
    <div className="m-2 w-max">
      <div
        onMouseEnter={() => setPinHovered(true)}
        onMouseLeave={() => setPinHovered(false)}
        onClick={() => router.push(`/pins/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="user-pin"
          className="rounded-lg w-full"
        />
        {pinHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 py-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />{" "}
                  {destination.length > 20
                    ? destination.slice(8, 20)
                    : destination.slice(8)}
                </a>
              )}

              {postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100  font-bold text-dark text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link href={`/user-profile/${postedBy?._id}`}>
        <a className="flex gap-2 mt-2 items-center">
          <img
            src={postedBy?.image}
            alt="user-profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm text-black uppercase">{postedBy?.userName}</span>
        </a>
      </Link>
    </div>
  );
};

export default Pin;