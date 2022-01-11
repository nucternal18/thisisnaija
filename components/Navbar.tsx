import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { User } from "../lib/types";

const Navbar = ({
  user,
  searchTerm,
  setSearchTerm,
}: {
  user: User;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();

  if (!user) return null;
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => router.replace("/pin/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3 items-center">
          <Link href={`/user-profile/${user?._id}`}>
              <a className="hidden md:block">
                  <img src={user.image} alt="user" className="w-14 h-12 rounded-lg" />
              </a>
          </Link>
          <Link href={`/pin/create-pin}`}>
              <a className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-14 flex justify-center items-center">
                  <IoMdAdd/>
              </a>
          </Link>
      </div>
    </div>
  );
};

export default Navbar;
