import { useState } from "react";
import Button from "../components/Button";
import loginImage from "../images/undraw_join_re_w1lh.svg";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../config/firebase";

import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedInUser, setSignedInUser] = useState(null);

  const handleEmailSignin = async (e) => {
    e.preventDefault();
    try {
      const isLogin = await signInWithEmailAndPassword(auth, email, password);
      if (isLogin) {
        setSignedInUser(isLogin.user.email);
      }
    } catch (err) {
      console.log(err);
      setSignedInUser(null);
    }
  };

  //firebase google Oauth function
  const handleGoogleSignin = async () => {
    try {
      const isLogin = await signInWithPopup(auth, googleProvider);
      if (isLogin) {
        setSignedInUser(isLogin.user.email);
      }
    } catch (err) {
      console.error(err);
      setSignedInUser(null);
    }
  };

  return (
    <div className="py-4 px-5 bg-gradient-to-tr from-blue-100 via-blue-300 to-purple-100 min-h-screen">
      <h1 className="text-3xl text-blue-600 font-bold line-through tracking-widest lg:text-4xl">
        Todo App
      </h1>
      <div
        className={`py-2 px-2 flex flex-col items-center md:py-10 md:max-w-sm lg:max-w-fit lg:flex-row mx-auto lg:space-x-20`}
      >
        <img src={loginImage} alt="" className="w-48 mx-auto md:w-80" />
        <div className="mx-auto w-full">
          <form
            action="#"
            className="flex flex-col gap-y-6 pt-8 pb-12 px-6 max-w-xs mx-auto rounded-2xl bg-white border-2 border-gray-500 shadow transition-shadow hover:shadow-2xl md:mx-0 md:max-w-md md:gap-y-9"
          >
            {/* email form group */}
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="signup_email"
                className="border border-l-0 border-r-0 border-t-0 border-b-blue-600 border-4 py-2 px-4 "
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* password form group */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="signup_password"
                className="border border-l-0 border-r-0 border-t-0 border-blue-600 border-4 py-2 px-4"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* login button */}
            <Button type="submit" text="Login" onClick={handleEmailSignin} />

            {/* register option */}
            <Link className="text-center text-sm" to="/signup">
              Don't have an account? Sign up
            </Link>

            {/* google option */}
            <Button
              type="button"
              text="Login with Google"
              onClick={handleGoogleSignin}
            />
            {signedInUser && <Navigate to="/" />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
