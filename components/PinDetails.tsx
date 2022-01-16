import Link from "next/link";
import { MdDownloadForOffline } from "react-icons/md";
import { MasonryLayout, Spinner } from ".";
import { urlFor } from "../lib/client";
import { PinDetails, User } from "../lib/types";

interface PinDetailsProps {
  user: User;
  comment: string;
  pinDetails: PinDetails;
  pins: any[];
  addingComment: boolean;
  addComment: () => void;
  setComment: React.Dispatch<React.SetStateAction<string>>
}
const PinDetails = ({ user, pinDetails, pins, comment, setComment, addingComment, addComment }: PinDetailsProps) => {
  const image = urlFor(pinDetails?.image).url();

  return (
    <>
    <div
      className="flex xl:flex-row flex-col m-auto bg-white"
      style={{ maxWidth: "1500px", borderRadius: "32px" }}
    >
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={image}
          alt="user-post"
          className="rounded-t-3xl rounded-b-lg"
        />
      </div>
      <div className="w-fill p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetails.image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetails.destination} target="_blank" rel="noreferrer">
            {pinDetails.destination}
          </a>
        </div>
        <div>
          <h1 className="text-4xl font-bold break-words mt-3">
            {pinDetails.title}
          </h1>
          <p className="mt-3">{pinDetails.about}</p>
        </div>
        <Link href={`/user-profile/${pinDetails.postedBy?._id}`}>
          <a className="flex gap-2 mt-5 items-center bg-white shadow-md p-2 rounded-lg">
            <img
              src={pinDetails.postedBy?.image}
              alt="user-profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-semibold text-sm text-black uppercase">
              {pinDetails.postedBy?.userName}
            </span>
          </a>
        </Link>
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-7-370 overflow-7-auto">
          {pinDetails?.comments?.map((comment, i) => (
            <div
              className="flex gap-2 mt-5 items-center bg-white shadow-md rounded-lg p-1"
              key={i}
            >
              <img
                src={comment.postedBy.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="flex flex-col">
                <p className="font-bold">{comment?.postedBy?.userName}</p>
                <p>{comment?.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mt-6 gap-3 items-center">
          <Link href={`/user-profile/${pinDetails.postedBy?._id}`}>
            <a >
              <img
                src={pinDetails.postedBy?.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </a>
          </Link>
          <input type="text" className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-200" placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type="button" className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none" onClick={addComment}>
            {addingComment ? 'Posting the comment...': 'Post'}
          </button>
        </div>
      </div>
    </div>
    {pins?.length > 0 ? (
      <> 
      <h2 className="text-center font-bold text-2xl mt-8 mb-4">More lke this</h2>
      <MasonryLayout pins={pins} />
      </>
    ): (
      <Spinner message="Loading more pins" />
    )}
    </>
  );
};

export default PinDetails;
