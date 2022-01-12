import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import { Navbar } from ".";
import {User} from "../lib/types";

interface Layout {
    children: React.ReactNode;
    user?: User;
    searchTerm?: string;
    setSearchTerm?: Dispatch<SetStateAction<string>>;
}

export default function Layout({ children, user, searchTerm, setSearchTerm }: Layout) {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
    
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <main className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={35}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          />
          <Link href={"/"}>
            <a>
              <Image src="/logo.png" alt="logo" width={120} height={28} />
            </a>
          </Link>
          <Link href={`/user-profile/${user?._id}`}>
            <a>
              <img src={user?.image} alt="logo" className="w-28" />
            </a>
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(!toggleSidebar)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <div className="px-2 md:px-5 w-full">
          <div className="bg-gray-50 w-full">
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
          </div>
          <div className="h-full w-full">{children}</div>
        </div>
      </div>
    </main>
  );
}
