import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { React, useRef, useState } from "react";
import auth from "../../firebase.init";
import "./Registration.css";
import Loading from "../Loading/Loading";
import Helmet from "react-helmet";
import useAddUserDb from "../../hooks/useAddUserDb";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/User/userSlice";

const Registration = () => {
  const dispatch = useDispatch()
  const {userEmail, isRegisterLoading,error} = useSelector(state=>state.user)
  // const [createUserWithEmailAndPassword, user, loading, error] =
  //   useCreateUserWithEmailAndPassword(auth); //create user with email and password

  const [signInWithFacebook, fbUser, fbLoading, fbError] =
    useSignInWithFacebook(auth);

  const [updateProfile, updating, err] = useUpdateProfile(auth);

  const [sendEmailVerification, sending, error1] =
    useSendEmailVerification(auth);

  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";

  //use Sate
  const [newUser, setUser] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const matric = useRef("");
  const phoneNumber = useRef("");
  const address = useRef("");

  useAddUserDb(newUser); //send registred user data to database

  // function of signup button to register an user
  const handleSignUp = async (e) => {
    e.preventDefault();
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const phoneNumberValue = phoneNumber.current.value;
    const matricValue = matric.current.value;
    const addressValue = address.current.value;
    const createUser = {
      name: nameValue,
      email: emailValue.toLocaleLowerCase(),
      phoneNumber: phoneNumberValue,
      matricValue: matricValue,
      addressValue:addressValue
    };
    setUser(createUser);
    dispatch(registerUser({emailValue,passwordValue}))
    await updateProfile({ displayName: nameValue });
    await sendEmailVerification();
    // navigate(from, {replace:true});
  };

  const handleFacebookSignUp = async () => {
    await signInWithFacebook();
    if (fbUser) {
      const createUser = {
        name: fbUser.user.displayName,
        email: fbUser.user.email,
        phoneNumber: "",
        matricValue: "",
      };
    }
  };

  if (isRegisterLoading || updating || sending || fbLoading) {
    return <Loading></Loading>;
  }
  if (newUser || fbUser) {
    navigate('/home');
  }
  //add user data to the database
  return (
    <div className="App">
      <div
        style={{ backgroundColor: "white", height: "calc(100vh + 0px)" }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <title>Registration-Jom Tapau</title>
        </Helmet>

        <div className="d-lg-flex body-reg login-div">
          {/* <div className=" w-lg-50 reg-img-container">
            <img
              className=" w-100"
              style={{ height: "calc(100vh + 0px)" }}
              src="https://i.ibb.co/Dg3F3FV/IMG-9325.jpg"
              alt=""
            />
          </div> */}

          {/* <div className="w-75 mx-auto px-lg-5 mt-5 pt-5"> */}
          <div className=" px-lg-5 pt-3 sign-container">

            {/* <h1
              style={{ fontSize: "80px" }}
              className="text-center mt-4 mb-2  waviy"
            >
              <span
                style={{ "--i": 1 }}
                className="animate shadow-red text-white"
              >
                J
              </span>
              <span
                style={{ "--i": 2 }}
                className="animate shadow-white text-danger"
              >
                om
              </span>

              <span
                style={{ "--i": 3 }}
                className="animate shadow-red text-white"
              >
                Ta
              </span>
              <span
                style={{ "--i": 4 }}
                className="animate shadow-white text-danger"
              >
                pa
              </span>
              <span
                style={{ "--i": 5 }}
                className="animate shadow-red text-white"
              >
                u
              </span>
            </h1> */}
            <div className="d-flex justify-content-center">
              <div>
                <small className="text-bold text-center mt-5 fs-3">
                  Please Sign Up
                </small>
              </div>
            </div>
            <form className="w-100 pb-4" onSubmit={handleSignUp}>
              <div className="login-container w-100">
                <div className="did-floating-label-content">
                  <input
                    ref={name}
                    size={20}
                    className="did-floating-input"
                    type="text"
                    placeholder=" "
                  />
                  <label className="did-floating-label">Name</label>
                </div>
                {/* <div className='d-lg-flex justify-content-between  '> */}
                <div className="did-floating-label-content">
                  <input
                    ref={email}
                    className="did-floating-input"
                    type="email"
                    placeholder=" "
                    size={20}
                  />
                  <label className="did-floating-label">Email</label>
                </div>
                <div className="did-floating-label-content">
                  <input
                    ref={phoneNumber}
                    className="did-floating-input"
                    type="text"
                    placeholder=" "
                    size={15}
                  />
                  <label className="did-floating-label">Phone Number</label>
                </div>
                {/* </div> */}
                {/* <div className='d-lg-flex justify-content-between'> */}
                <div className="did-floating-label-content did-error-input">
                  <input

                    ref={matric}
                    className="did-floating-input"
                    type="text"
                    placeholder=" "
                  // size={15}
                  />
                  <label className="did-floating-label">Matric</label>
                </div>
                <div className="did-floating-label-content did-error-input">
                  <input
                    width={50}
                    ref={address}
                    className="did-floating-input"
                    type="text"
                    placeholder=" "
                    // size={15}
                  />
                  <label className="did-floating-label">Address</label>
                </div>
                <div className="did-floating-label-content did-error-input">
                  <input

                    ref={password}
                    className="did-floating-input"
                    type="password"
                    placeholder=" "
                  // size={15}
                  />
                  <label className="did-floating-label">Password</label>
                </div>
                {/* </div> */}
              </div>
              <div >
                <div style={{ marginTop: '-15px' }}>
                  <Button
                    style={{ justifyContent: "center", margin: "auto", width: '90%' }}
                    onClick={handleSignUp}
                    type="submit"
                    className="signButton w-90 mb2"
                  >
                    {/* <svg viewBox="0 0 512 512" class="svgIcon"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 128z"></path></svg> */}
                    Sign Up
                  </Button>
                </div>
                {/* ------------------- or -------------------
                <div className="d-flex justify-content-center">
                  <Button style={{width:'150px'}} onClick={handleFacebookSignUp} variant="primary">
                    FaceBook
                  </Button>
                </div> */}
              </div>

            </form>
            <div>
              <p className="text-danger fs-5" style={{ marginTop: '-16px' }}>
                {(error && error.message.split("/")[1].split(")")[0]) ||
                  (fbError && fbError.message.split("/")[1].split(")")[0]) ||
                  (errorMsg && errorMsg)}
              </p>
              <p style={{ marginTop: '-16px' }} className="fs-6">
                Already have an Account? <Link to="/login" className="register">Login</Link>
              </p>
            </div>
            <div className="divider">
              <div className="circle"></div>
              <span className="or">OR</span>
              <div className="circle"></div>
            </div>


            <div className="socialCard">
              <a className="socialContainer containerOne" href="#">
                <svg viewBox="0 0 488 512" className="socialSvg googleSvg"> <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path> </svg>
              </a>

              <a className="socialContainer containerTwo" href="#">
                <svg viewBox="0 0 320 512" className="socialSvg facebookSvg"> <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path> </svg>              </a>

              <a className="socialContainer containerThree" href="#">
                <svg viewBox="0 0 448 512" className="socialSvg linkdinSvg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
              </a>
            </div>
          </div>


        </div>

      </div>

    </div>

  );
};

export default Registration;
