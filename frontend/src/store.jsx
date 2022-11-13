import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./components/reducers/AuthRecuder";
import {
  productsReducer,
  productDetailsReducer,
} from "./components/reducers/ProductReducer";
const reducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
});

const middlware = [thunk];
const store = createStore(
  reducer,

  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
