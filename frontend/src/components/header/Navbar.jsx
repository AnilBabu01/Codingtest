import React, { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearErrors } from "../actions/AuthAction";
import { useAlert } from "react-alert";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [isMobile, setisMobile] = useState(false);
  const userrole = localStorage.getItem("userrole");
  const token = localStorage.getItem("testtoken");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const logoutuser = () => {
    localStorage.removeItem("testtoken");
    dispatch(logout());
    alert.error("You have Logout Successsfully");
    navigate("/");
  };
  useEffect(() => {}, [logout, isAuthenticated]);

  return (
    <>
      <nav className={style.navbar}>
        <h1>CodingTest</h1>

        <ul className={isMobile ? style.mobilelinks : style.navlinks}>
          {userrole === "user" && (
            <>
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
            </>
          )}

          {userrole === "admin" && (
            <>
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
            </>
          )}
          {isAuthenticated ? (
            <>
              <li onClick={() => setisMobile(false)}>
                <NavLink
                  onClick={logoutuser}
                  to="/"
                  className={({ isActive }) =>
                    isActive ? style.active : style.home
                  }
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
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
