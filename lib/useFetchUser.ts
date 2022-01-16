import { useEffect, useState } from "react";
import { userQuery } from "../utils/data";
import { client } from "./client";
import { User, UserInfoProps } from "./types";

export const useFetchUser = () => {
  const [user, setUser] = useState<User>(null);
  const [userInfo, setUserInfo] = useState<UserInfoProps>( typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : {});

  useEffect(() => {
    const currentUser =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    setUserInfo(currentUser);
  }, []);

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  return { userInfo, user };
};
