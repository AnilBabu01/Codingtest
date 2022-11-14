import React from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../metadata/Helmet";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../actions/OrderAction";

import "./Cart.css";
const OrderDone = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const doneorder = () => {
    dispatch(createOrder(order));
    alert.success("Your Order Successfully done");
  };
  return (
    <>
      <div className="maindon-order-div">
        <button onClick={doneorder}>DoneOrder</button>
      </div>
    </>
  );
};

export default OrderDone;
