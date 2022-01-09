import GoogleLogin from "react-google-login";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

import { client } from "../lib/client"


function Login() {
    const router = useRouter();
    const responseGoogle = (response) => {
        localStorage.setItem("user", JSON.stringify(response.profileObj));
        const { name, googleId, imageUrl } = response.profileObj;
        const doc = {
            _id: googleId,
            _type: "user",
            userName: name,
            image: imageUrl,
        }
        client.createIfNotExists(doc).then(() => {
            router.push("/");
        })
    }
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        >
          <source src="/share.mp4" type="video/mp4" />
        </video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src="/logo.png" alt="logo" className="w-[130px]" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;