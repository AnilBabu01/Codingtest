import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Addproduct from "./components/product/Addproduct";
import Home from "./components/home/Home";
import ProduuctDetails from "./components/product/ProduuctDetails";
import Cart from "./components/cart/Cart";
import Shippinginfo from "./components/cart/Shippinginfo";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderDone from "./components/cart/OrderDone";
import ListOrders from "./components/order/ListOrders";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/product/:id" element={<ProduuctDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shippinginfo" element={<Shippinginfo />} />
          <Route path="/confirm" element={<ConfirmOrder />} />
          <Route path="/orderdone" element={<OrderDone />} />
          <Route path="/myorder" element={<ListOrders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
