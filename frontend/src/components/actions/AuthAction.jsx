import axios from "axios";

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/AuthContants";

// Register user action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    console.log("data user", userData);

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/auth/regster`,
      userData
    );
    console.log(userData);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
      status: data.status,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Login action

export const login = (userdata) => async (dispatch) => {
  axios.defaults.withCredentials = true;

  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Credentials: "include",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/auth/login`,
      userdata,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user action
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors action
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
