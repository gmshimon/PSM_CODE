import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import { Button } from "bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cart = ({ count, cart, incrementCount, setCart, setCount }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()
  const handleProceedPayment = () =>{
    navigate('/payment')
  }
  return (
    <div style={{ margin: "100px" }}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Checkout-Jom Tapau</title>
      </Helmet>
      <div className="cart-items">
        {cart.length == 0 ? (
          <p className="text-danger">No Food Has Been Added</p>
        ) : (
          <></>
        )}
        {cart.map((item) => (
          <CartItem
          key={item._id}
            total={total}
            setTotal={setTotal}
            count={count}
            setCount={setCount}
            setCart={setCart}
            cart={cart}
            incrementCount={incrementCount}
            item={item}
          ></CartItem>
        ))}
      </div>

      <hr className="line" />

      <div className="total">
        <div className="total-row">
          <span>Subtotal:</span> <span>RM {total}</span>
        </div>
        <div className="total-row">
          <span>Delivery:</span>{" "}
          <span> {total > 0 ? <p>RM 0</p> : <p>RM 0</p>}</span>
        </div>
        <div className="total-row grand-total">
          <span>Total:</span>{" "}
          <span>{total > 0 ? <p>RM {total + 0}</p> : <p>RM 0</p>}</span>
        </div>
        <button onClick={handleProceedPayment} className="checkout">Proceed to payment</button>
      </div>
    </div>
  );
};

export default Cart;
