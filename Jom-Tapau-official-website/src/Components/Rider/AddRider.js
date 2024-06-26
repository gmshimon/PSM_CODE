import React, { useEffect } from "react";
import useRiders from "../../hooks/useRiders";
import "./AddRider.css";

const AddRider = (props) => {
  const { notRider } = useRiders();
  const handleAddRider = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/addRider`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      {/* TODO: add some good text here and some fancy design */}
      <h2 className="title text-center">Add Rider</h2>
      {notRider.length === 0 ? (
        <div className="not-found">
          <span className="">No available users to add!</span>
        </div>
      ) : (
        <section className="cart-container">
          <div>
            <div className="cart">
              <div className="info-container">
                <table className="table user-list">
                  <thead className="table-dark">
                    <tr>
                      <th>
                        <span>User</span>
                      </th>
                      <th>
                        <span className="text-center">Phone Number</span>
                      </th>
                      <th>
                        <span>Email</span>
                      </th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notRider.map((rider) => (
                      <tr key={rider._id}>
                        <td>
                          <img
                            src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
                            alt=""
                          />
                          <p className="user-link">{rider.name}</p>
                        </td>
                        <td>
                          <p className="user-link">
                            {rider.phoneNumber ? rider.phoneNumber : "--"}
                          </p>
                        </td>
                        <td>
                          <p className="user-link">{rider.email}</p>
                        </td>
                        <td style={{ width: "20%" }}>
                          <span className="fa-stack table-link text-info">
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={() => handleAddRider(rider._id)}
                            >
                              Add
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AddRider;
