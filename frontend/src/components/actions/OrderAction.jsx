import axios from "axios";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
} from "../constants/OrderContants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("testtoken")}`;
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/order/neworder`,
      order,
      config
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("testtoken")}`;

    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/order/myorder`
    );

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
