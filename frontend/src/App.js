import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Addproduct from "./components/product/Addproduct";
import Home from "./components/home/Home";
import ProduuctDetails from "./components/product/ProduuctDetails";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
