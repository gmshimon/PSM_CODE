import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import "./EditProfile.css";
import { faArrowAltCircleLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

const EditProfilePage = () => {
  const [user] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({});
  
  const email = user?.email;
  //fetch the user from the database
  useEffect(() => {
    fetch("http://localhost:5000/findUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setUserDetails(data);
      });
  }, [user]);
  
  console.log(userDetails)
  const navigate = useNavigate();
  const [userU, setUserU] = useState({});
  const handleChangeInput = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const updatedUser = { ...userDetails };
    updatedUser[field] = value;
    setUserU(updatedUser);
  };
  const submit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/user/${userDetails._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userU),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    navigate("/profile");
  };
  if(!user?.email){
    return (<Loading className="text-center"></Loading>)}
  return (
    <div style={{height:"90vh"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Profile</title>
      </Helmet>
      <div className="editprofile-container mb-3" style={{paddingTop:"50px"}}>
        <section id="edit-container" className="edit-container">
          <div className="">
            <div>
                <button onClick={()=>navigate("/profile")} className="d-inline"><FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon></button>
              <h2 className="text-center">Edit profile</h2>
            </div>
            <hr />
            <form onSubmit={submit}>
              <table>
                <tr>
                  <td className="profile">Name: </td>
                  <td className="profile">
                    {" "}
                    <input
                      onChange={handleChangeInput}
                      style={{ width: "110%" }}
                      type="text"
                      id="updateName"
                      name="name"
                      defaultValue={userDetails.name}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="profile">Email:</td>
                  <td className="profile">
                    {" "}
                    <input
                      onChange={handleChangeInput}
                      disabled
                      style={{ width: "110%" }}
                      type="text"
                      id="updateEmail"
                      name="email"
                      defaultValue={userDetails.email}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="profile">Phone Number:</td>
                  <td className="profile">
                    {" "}
                    <input
                      onChange={handleChangeInput}
                      style={{ width: "110%" }}
                      type="text"
                      id="updatePhone"
                      name="phoneNumber"
                      defaultValue={userDetails?.phoneNumber}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="profile">Matric:</td>
                  <td className="profile">
                    {" "}
                    <input
                      onChange={handleChangeInput}
                      style={{ width: "110%" }}
                      type="text"
                      id="updateMatric"
                      name="matricValue"
                      defaultValue={userDetails.matricValue}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="profile">Address:</td>
                  <td className="profile">
                    {" "}
                    <input
                      onChange={handleChangeInput}
                      defaultValue={userDetails.address}
                      style={{ width: "110%" }}
                      type="text"
                      id="updateAddress"
                      name="address"
                    />
                  </td>
                </tr>
              </table>
              <div style={{ textAlign: "center" }}>
                <button type="submit" id="submit-btn" name="update">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditProfilePage;
