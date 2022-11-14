import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./components/reducers/AuthRecuder";
import {
  productsReducer,
  productDetailsReducer,
} from "./components/reducers/ProductReducer";
import { cartReducer } from "./components/reducers/CartReducer";

import {
  newOrderReducer,
  myOrdersReducer,
} from "./components/reducers/OrderReducer";
const reducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};
const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
