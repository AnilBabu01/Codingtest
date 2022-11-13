import React, { useState } from "react";
import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Navbar = () => {
  const [isMobile, setisMobile] = useState(false);

  return (
    <>
      <nav className={style.navbar}>
        <h1>CodingTest</h1>

        <ul className={isMobile ? style.mobilelinks : style.navlinks}>
          <li>
            <NavLink
              className={style.cartlis}
              onClick={() => setisMobile(false)}
              to="/cart"
              state={{ textDecoration: "none" }}
            >
              <span id="cart">
                <ShoppingCartIcon />
              </span>
              <span id="cart_count">2</span>
            </NavLink>
          </li>
          <li onClick={() => setisMobile(false)}>
            <NavLink
              to="/addproduct"
              className={({ isActive }) =>
                isActive ? style.active : style.home
              }
            >
              Addproduct
            </NavLink>
          </li>
          <li onClick={() => setisMobile(false)}>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? style.active : style.home
              }
            >
              Register
            </NavLink>
          </li>
          <li onClick={() => setisMobile(false)}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? style.active : style.home
              }
            >
              Login
            </NavLink>
          </li>
        </ul>

        <i
          style={{ marginRight: "20px" }}
          onClick={() => setisMobile(!isMobile)}
          className={style.mobileMenuIcon}
        >
          {isMobile ? (
            <>
              <CloseIcon style={{ height: "40px" }} className={style.burger} />
            </>
          ) : (
            <>
              <MenuIcon style={{ height: "40px" }} className={style.burger} />
            </>
          )}
        </i>
      </nav>
    </>
  );
};

export default Navbar;
