import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Loading/Loading";
import "./Login.css";
import Helmet from "react-helmet";
import { useSignInWithFacebook } from "react-firebase-hooks/auth";
import useAddUserDb from "../../hooks/useAddUserDb";

const Login = () => {
  const [user, setUser] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const location = useLocation();

  const [signInWithFacebook, fbUser, fbLoading, fbError] =
    useSignInWithFacebook(auth);

  useAddUserDb(fbUser?.user); //send registred user data to database

  let from = location?.state?.from?.pathname || "/";

  if (user || fbUser) {
    navigate(from, { replace: true });
  }

  if (loading || fbLoading) {
    return <Loading></Loading>;
  }

  const handleLoginForm = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorMessage);
        setLoading(false);
      });
  };
  const handleForgotPassword = () => {
    console.log("handle forgot password");
    sendPasswordResetEmail(auth)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  const handleFacebookSignUp = async () => {
    await signInWithFacebook();
  };



  return (
    <div className="App">
      <div
        className="vh-100"
        style={{ backgroundColor: "white", height: "calc(100vh + 0px)" }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <title>Login-Jom Tapau</title>
        </Helmet>
        <div className="d-lg-flex body-reg login-div ">
          {/* <div className="px-lg-5 pt-4 sign-container"> */}
          {/* <div className="w-75 mx-auto px-lg-5 mt-5 pt-5"> */}

          <div className=" px-lg-5 pt-3 sign-container">
            <div style={{ "--i": 6 }} className="d-flex justify-content-center">
              <div>

                <small className="text-bold text-center mt-5 fs-3">
                  Please Login to continue
                </small>
              </div>
            </div>
            <form className="w-100 mt-3" onSubmit={handleLoginForm}>
              <div className="login-container w-100">
                <div className="did-floating-label-content">
                  <input
                    ref={emailRef}
                    className="did-floating-input"
                    type="email"
                    placeholder=" "
                    size={20}
                  />
                  <label className="did-floating-label">Email</label>
                </div>
                <div className="did-floating-label-content did-error-input">
                  <input
                    ref={passwordRef}
                    className="did-floating-input"
                    type="password"
                    placeholder=" "
                  />
                  <label className="did-floating-label">Password</label>
                </div>
                <Link to="/forgotPassword" className="forgotPassword">
                  <small>Forgot Password?</small>
                </Link>
              </div>

              <div className="d-flex justify-content-center">
                <Button className="mb-2 signButton" type="submit">
                  Login{/* <svg viewBox="0 0 512 512" class="svgIcon"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 128z"></path></svg> */}
                </Button>
              </div>


              {loading ? <Loading /> : null}
              {error || (fbError && fbError.message.split("/")[1].split(")")[0]) ? (
                <p className="error-message">
                  {error ||
                    (fbError && fbError.message.split("/")[1].split(")")[0])}
                </p>
              ) : null}
              <small className="d-block text-dark">
                Don't have an Account yet?{" "}
                <Link to="/registration" className="register">Register</Link>
              </small>

              <div className="divider">
                <div className="circle"></div>
                <span className="or">OR</span>
                <div className="circle"></div>
              </div>


              <div className="socialCard">
                <a className="socialContainer containerOne" href="#">
                  <svg viewBox="0 0 488 512" className="socialSvg googleSvg"> <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path> </svg>
                </a>
              </div>



            </form>
            {/* <div className="d-flex justify-content-center ">
            <hr style={{ width: "200px", color: "red" }} />
            <p className="px-3 pt-1">or</p>
            <hr style={{ width: "200px", color: "red" }} />
          </div> */}
            <div className="d-flex justify-content-center">
              {/* <Button
              onClick={handleFacebookSignUp}
              style={{ width: "200px" }}
              variant="primary"
            >
              Facebook
            </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export default Login;
