import React, { useState, useEffect } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../actions/AuthAction";
import { useAlert } from "react-alert";
import "./Register.css";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, error, isAuthenticated, isRegisterGoLogin, isNotAuth } =
    useSelector((state) => state.auth);
  const [showpassword, setshowpassword] = useState(false);

  const { name, email, password } = credentials;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      name: name,
      email: email,
      password: password,
    };

    dispatch(register(userdata));
  };

  useEffect(() => {
    if (isRegisterGoLogin) {
      alert.success("You have register Successully");
      navigate("/login");
    }
    if (isNotAuth) {
      alert.error("Please Your email or password");
    }
  }, [dispatch, isAuthenticated, error, isRegisterGoLogin]);
  return (
    <>
      <div className="main-auth">
        <div>
          <div className="form-div-bg">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="input-div1">
                  <input
                    onChange={onChange}
                    name="name"
                    value={name}
                    type="text"
                    placeholder="Please enter name"
                  />
                </div>

                <div className="input-div1">
                  <input
                    onChange={onChange}
                    name="email"
                    value={email}
                    type="email"
                    placeholder="Please enter email"
                  />
                </div>
                <div className="input-div1">
                  <li
                    className="showpassworddsignup"
                    onClick={() => setshowpassword(!showpassword)}
                  >
                    {showpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </li>
                  <input
                    onChange={onChange}
                    name="password"
                    value={password}
                    type={showpassword ? "text" : "password"}
                    placeholder="Please enter login password"
                  />
                </div>

                <div className="btn-div14">
                  <button
                    className={
                      name && email && password
                        ? "reg-not-sable "
                        : "reg-disable"
                    }
                    disabled={name && email && password ? "" : true}
                  >
                    {loading ? (
                      <CircularProgress
                        style={{ width: "21px", height: "21px" }}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="reg-div1">
              <Link className="forget-pass" to="/login">
                Already have an account, log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
