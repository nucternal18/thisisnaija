export const fetchUser = () => {
    const userInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    return userInfo;
}