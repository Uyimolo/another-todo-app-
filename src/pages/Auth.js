import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";
import loginImage from "../images/undraw_join_re_w1lh.svg";
import { Navigate } from "react-router-dom";

const Auth = ({ user, setUser, error, setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const [authMethod, setAuthMethod] = useState("signin");

  //firebase email auth function
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const isSignUp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(isSignUp);
      if (isSignUp) {
        // console.log(isSignUp.user.email);
        setUser(isSignUp.user.email);
      }
    } catch (err) {
      console.error(err);
      setUser(null);
      // alert("something went wrong");
      setError("something went wrong");
    }
  };

  const handleEmailSignin = async (e) => {
    e.preventDefault();
    try {
      const isLogin = await signInWithEmailAndPassword(auth, email, password);
      if (isLogin) {
        setUser(isLogin.user.email);
      }
    } catch (err) {
      console.log(err);
      setUser(null);
      // alert("something went wrong");
      setError("something went wrong");
    }
  };
  //firebase google Oauth function
  const handleGoogleSignin = async () => {
    try {
      const isLogin = await signInWithPopup(auth, googleProvider);
      if (isLogin) {
        setUser(isLogin.user.email);
      }
    } catch (err) {
      console.error(err);
      setUser(null);
      // alert("something went wrong");
      setError("something went wrong");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [setError, error]);

  return (
    <div className="py-4 px-5 bg-gradient-to-tr from-blue-100 via-blue-300 to-purple-100 min-h-screen relative">
      <h1 className="text-3xl text-blue-600 font-bold line-through tracking-widest lg:text-4xl">
        Todo App
      </h1>
      <div
        className={`py-2 px-2 bg-[${loginImage}] flex flex-col items-center md:py-10 md:max-w-sm lg:max-w-fit lg:flex-row mx-auto lg:space-x-20`}
      >
        <img src={loginImage} alt="" className="w-48 mx-auto md:w-80" />
        <div className="mx-auto w-full">
          {authMethod === "signup" ? (
            <SignupForm
              setEmail={setEmail}
              setPassword={setPassword}
              handleEmailSignup={handleEmailSignup}
              handleGoogleSignin={handleGoogleSignin}
              setAuthMethod={setAuthMethod}
              error={error}
            />
          ) : (
            <SigninForm
              setEmail={setEmail}
              setPassword={setPassword}
              handleEmailSignin={handleEmailSignin}
              handleGoogleSignin={handleGoogleSignin}
              setAuthMethod={setAuthMethod}
              error={error}
            />
          )}
        </div>
      </div>
      {user && <Navigate to="/" />}
    </div>
  );
};

export default Auth;
