import { GoogleLogout } from "react-google-login";
import { AiOutlineLogout } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MasonryLayout } from ".";
import { PinDetails, User } from "../lib/types";

interface IUserProfile {
    randomImage: string;
    user: User;
    userId: string;
    activeBtn: string;
    pins: PinDetails[];
    handleLogout: () => void;
    setText: React.Dispatch<React.SetStateAction<string>>;
    setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
}

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full  w-20 outline-none';
const NotActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full  w-20 outline-none';

function UserProfile({ randomImage, user, userId, handleLogout, setText, activeBtn, setActiveBtn, pins }: IUserProfile) {
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              src={randomImage}
              alt="banner-pic"
            />
            <img
              src={user?.image}
              alt="user-pic"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user?.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user?._id && (
                <GoogleLogout
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-white p-2 rounded-full  cursor-pointer outline-none shadow-md"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout
                        color="red"
                        fontSize={21}
                      />
                    </button>
                  )}
                  onLogoutSuccess={handleLogout}
                />
              )}
            </div>
          </div>
          <div className="text-center mb-7">
              <button type="button" onClick={(e) => {
                  setText(e.currentTarget.textContent);
                  setActiveBtn('created')
              }}
              className={`${activeBtn === 'created' ?  activeBtnStyles : NotActiveBtnStyles}`}
              >
                  Created
              </button>
              <button type="button" onClick={(e) => {
                  setText(e.currentTarget.textContent);
                  setActiveBtn('saved')
              }}
              className={`${activeBtn === 'saved' ?  activeBtnStyles : NotActiveBtnStyles}`}
              >
                 Saved
              </button>
          </div>
          <div className="px-2">
              {pins?.length ? <MasonryLayout pins={pins} /> : (
                  <div className="flex justify-center items-center font-bold w-full text-xl mt-2">
                        No pins yet!
                  </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
