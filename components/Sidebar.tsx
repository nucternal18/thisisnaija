import Link from "next/link";
import { useRouter } from "next/router";
import { RiHomeFill } from "react-icons/ri";
import {IoIosArrowForward} from "react-icons/io";
import { categories } from "../utils/data";
interface SidebarProps {
    user: any;
    closeToggle?: any;
}

function ActiveLink({ children, href, onClick }) {
  const router = useRouter();
    const isActiveStyle =
      "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black hover:text-black transition-all duration-200 ease-in-out uppercase";
    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500  transition-all duration-200 ease-in-out uppercase'
  return (
    <Link href={href}>
      <a
        className={`${
          router.asPath === href ?
            isActiveStyle : isNotActiveStyle
        }`}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
}


function Sidebar({user, closeToggle}: SidebarProps) {
    const router = useRouter();
    const handleCloseSidebar = () => {
        if(closeToggle) {
            closeToggle(false);
        }
    }
    return (
      <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
        <div className="flex flex-col">
          <Link href={"/"}>
            <a
              className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
              onClick={handleCloseSidebar}
            >
              <img src="/logo.png" alt="logo" className="w-full" />
            </a>
          </Link>
          <div className="flex flex-col gap-5">
            <ActiveLink href={"/"} onClick={handleCloseSidebar}>
              <RiHomeFill /> Home
            </ActiveLink>
            <h3 className="mt-2 px-5 text-base 2xl:text-xl">
              {" "}
              Discover Categories
            </h3>
            {categories.slice(0, categories.length - 1).map((category) => (
              <ActiveLink
                href={`/category/${category.name}`}
                onClick={handleCloseSidebar}
                key={category.name}
              >
                {category.name}
              </ActiveLink>
            ))}
          </div>
        </div>
        {user && (
          <Link href={`user-profile/${user._id}`}>
            <a
              className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 justify"
              onClick={handleCloseSidebar}
            >
              <img
                src={user.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p>{user.userName}</p>
            </a>
          </Link>
        )}
      </div>
    );
}

export default Sidebar
