import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../actions/AuthAction";
import { useAlert } from "react-alert";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setshowpassword] = useState(false);
  const [message, setmessage] = useState("");
  const success = "success";
  const {
    loading,
    error,
    isAuthenticated,
    isRegisterGoLogin,
    isNotAuth,
    user,
  } = useSelector((state) => state.auth);
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const { email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userdata = {
      email: email,
      password: password,
    };

    dispatch(login(userdata));
  };
  useEffect(() => {
    if (isAuthenticated) {
      alert.success("You have login Successully");
      localStorage.setItem("testtoken", user.token);
      localStorage.setItem("userrole", user.user.role);
      navigate("/");
    }
    if (isNotAuth) {
      alert.error("Please Your email or password");
    }
  }, [dispatch, isAuthenticated, error, isRegisterGoLogin]);

  return (
    <>
      <div className="main-auth">
        <div>
          {message && (
            <Alert variant="filled" severity={success}>
              {message}
            </Alert>
          )}

          <div className="form-div-bg">
            <form onSubmit={handleSubmit}>
              <div className="input-div1">
                <input
                  onChange={onChange}
                  name="email"
                  value={email}
                  type="text"
                  placeholder="Login email"
                />
              </div>
              <div className="input-div">
                <input
                  onChange={onChange}
                  name="password"
                  value={password}
                  type={showpassword ? "text" : "password"}
                  placeholder="Login Password"
                />
                <li
                  className="showpassworddsignup1"
                  onClick={() => setshowpassword(!showpassword)}
                >
                  {showpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </li>
              </div>
              <div className="btn-div">
                <button>
                  {loading ? (
                    <CircularProgress
                      style={{ width: "21px", height: "21px" }}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            <div className="reg-div1">
              <Link to="/register">don't have an account, register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
