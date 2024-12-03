import React, { useState, useRef } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(null);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setIsError(message);
    if (message) return;
    if (!isSignInForm) {
      //for signup

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //update name
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setIsError(errorCode + "-" + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsError(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsError(errorCode + "-" + errorMessage);
        });
    }
  };
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [nameField, setNameField] = useState("");

  const handleEmailChange = (event) => {
    setEmailField(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordField(event.target.value);
  };
  const handleNameChange = (event) => {
    setNameField(event.target.value);
  };

  return (
    <div className="bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_medium.jpg')] bg-cover bg-center h-screen relative">
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="z-10">
        <Header />
      </div>

      <div className="flex flex-col justify-center h-screen w-4/12 mx-auto ">
        <div className="bg-[rgba(0,0,0,0.7)] z-10">
          <div className="px-12">
            <p className="text-white pt-8 text-3xl font-bold pb-6">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </p>

            <div className="w-full">
              <form className=" flex flex-col" onSubmit={handleFormSubmit}>
                {!isSignInForm && (
                  <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    value={nameField}
                    onChange={handleNameChange}
                    className={`p-2 m-2 rounded bg-inherit border border-slate-400 ${
                      nameField ? "text-white" : "text-black"
                    }`}
                  />
                )}

                <input
                  ref={email}
                  type="text"
                  placeholder="Email Address"
                  value={emailField}
                  onChange={handleEmailChange}
                  className={`p-2 m-2 rounded bg-inherit border border-slate-400 ${
                    emailField ? "text-white" : "text-black"
                  }`}
                />
                <input
                  ref={password}
                  type="password"
                  value={passwordField}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className={`p-2 m-2 rounded bg-inherit border border-slate-400 ${
                    passwordField ? "text-white" : "text-black"
                  }`}
                />
                <button className="bg-red-700 text-white p-2 m-2 rounded">
                  {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                {isSignInForm && (
                  <>
                    <p className="text-white mx-auto">OR</p>
                    <button className="bg-[#2B2F2E] text-white p-2 m-2 rounded">
                      Use a sign-in code
                    </button>
                    <Link
                      to="#"
                      className="text-white mx-auto py-3 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </>
                )}
                <p className="text-red-500">{isError}</p>

                <p className="text-white p-2 m-2" onClick={toggleForm}>
                  {isSignInForm ? (
                    <>
                      New to Netflix?
                      <span className="hover:underline font-bold cursor-pointer">
                        {"  "}
                        Sign up now.
                      </span>
                    </>
                  ) : (
                    <>
                      Already have an account?
                      <span className="hover:underline font-bold cursor-pointer">
                        {"  "}
                        Sign in now.
                      </span>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
