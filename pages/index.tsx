import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

import { Sidebar, UserProfile } from "../components";
import Pins from "../components/Pins";
import { client } from "../lib/client";
import { userQuery } from "../utils/data";

export default function Home() {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

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
      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Pins user={user && user} />
      </div>
    </main>
  );
}
