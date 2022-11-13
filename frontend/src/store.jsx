import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./components/reducers/AuthRecuder";
import {
  productsReducer,
  productDetailsReducer,
} from "./components/reducers/ProductReducer";
import { cartReducer } from "./components/reducers/CartReducer";
const reducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
