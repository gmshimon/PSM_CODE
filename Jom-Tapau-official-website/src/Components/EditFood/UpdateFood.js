import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./UpdateFood.css";
import { useRef } from "react";

const foodOptions = [
  {id:1, value:"BreakFast"},
  {id:2,value:"Lunch"},
  {id:3,value:"Dinner"}
]
const UpdateFood = () => {
  const [food, singleFood] = useState({});
  const [imgurl, setImg] = useState("");
  const { foodID } = useParams();
  // console.log(foodID);

  //use ref to take the inputs of the food details
  const foodName = useRef("");
  const price = useRef("");
  const category = useRef("");

  const navigate = useNavigate();
  //load the food
  useEffect(() => {
    fetch(`http://localhost:5000/food/${foodID}`)
      .then((res) => res.json())
      .then((data) => {
        singleFood(data);
        setImg(data.imgURL);
      });
  }, [foodID]);
  /* 
        now using direct url of image to update the picture of the food
        later we will upload only the image to update the picture
    */
  const handleImageUrl = (e) => {
    setImg(e.target.value);
  };

  // TODO: update the picture of the food
  const handleUpdateFood = (e) => {
    e.preventDefault();
    const name = foodName.current.value;
    const foodPirce = parseFloat(price.current.value);
    const foodCategory = category.current.value;
    const foodDetails = {
      name: name,
      category: foodCategory,
      price: foodPirce,
      imgURL: imgurl,
    };

    //update foodDetails
    fetch(`http://localhost:5000/food/${foodID}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(foodDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) navigate("/EditFood");
      });
  };
  return (
    <div style={{ paddingTop: "80px" }}>
      <h1 className="text-center">Update Food Details</h1>
      <section className="d-flex justify-content-center align-items-center w-100">
        <div className="me-5">
          <img
            style={{ width: "300px", height: "300px", borderRadius: "150px" }}
            src={imgurl || ""}
            alt=""
          />
        </div>
        {/* edit food details */}
        <section id="edit-profile-container" className="edit-profile-container">
          <div className="box">
            <div>
              <h2>Food Details</h2>
            </div>
            <hr />
            <form action="" method="" onSubmit={handleUpdateFood}>
              <table>
                <tbody>
                  <tr>
                    <td className="profile">Food Name:</td>
                    <td className="profile">
                      {" "}
                      <input
                        ref={foodName}
                        style={{ width: "150%" }}
                        type="text"
                        id="updateName"
                        name="updateName"
                        defaultValue={food?.name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="profile">Price:</td>
                    <td className="profile">
                      <input
                        ref={price}
                        style={{ width: "150%" }}
                        type="text"
                        id="updateFatherName"
                        name="updateFatherName"
                        defaultValue={food?.price}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="profile">URL:</td>
                    <td className="profile">
                      {" "}
                      <input
                        style={{ width: "150%" }}
                        type="text"
                        defaultValue={food?.imgURL}
                        onChange={handleImageUrl}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="profile">Category:</td>
                    <td className="profile">
                      {" "}
                      <select
                        ref={category}
                        style={{ width: "150%" }}
                        type="text"
                        id="updateEmail"
                        name="updateEmail" 
                      >
                        <option value="">Select Category</option>
                        {
                          foodOptions.map(opt=>
                            opt.value===food.category?<option selected value={opt.value}>{opt.value}</option>:<option value={opt.value}>{opt.value}</option>
                          )
                        }
                        {/* <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Drinks">Drinks</option> */}

                      </select>
                      {/* <input
                        ref={category}
                        style={{ width: "150%" }}
                        type="text"
                        id="updateEmail"
                        name="updateEmail"
                        defaultValue={food.category}
                      /> */}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ textAlign: "center" }}>
                <button type="submit" id="submit-btn" name="update">
                  Update
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
};

export default UpdateFood;
