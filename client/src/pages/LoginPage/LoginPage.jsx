import React, { useContext, useState, useEffect } from "react";
import "./loginPage.css";
import Input from "../../components/Templates/InputField/Input";
import InputPassword from "../../components/Templates/InputField/InputPassword";
import Button from "../../components/Templates/Button/Button";
import { LoginContext } from "../../components/Context/LoginContext";
import { useNavigate } from "react-router-dom";
import Validation from "./Validation";
import { Link, NavLink } from "react-router-dom";
import { useAlert } from "react-alert";
import api from "../../util/api";
import Loading from "../../components/Templates/Loading/Loading";

const LoginPage = () => {
  const alert = useAlert();
  // const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const { dispatch, loading } = useContext(LoginContext);
  const value = {
    password: values.password,
    email: values.email,
  };

  const navigate = useNavigate();
  const setVal = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrors(Validation(values));
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(Validation(value));
    if (Object.keys(errors).length === 0) {
      if (value.email !== "") {
        dispatch({ type: "LOGIN_START" });
        try {
          const response = await api.login(value);
          const data = response.data;
          if (data.token && data.user) {
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
            alert.success("Successful");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            dispatch({ type: "LOGIN_FAILURE", payload: data });
            alert.error("ERROR-Check Your Information");
          }
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err });
          alert.error("Check Your Information");
        }
      }
    } else {
      alert.error("Check Your Information");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginBox">
        <form onSubmit={handleSubmit} className="loginInputs">
          <div className="loginInfo">
            <h3 style={{ textAlign: "center" }}>Login</h3>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={setVal}
              placeholder="Type your email"
            />
            {errors.email && (
              <p style={{ textAlign: "center" }}>{errors.email}</p>
            )}
            <InputPassword
              name="password"
              id="password"
              onChange={setVal}
              placeholder="password"
            />
            {errors.password && (
              <p style={{ textAlign: "center" }}>{errors.password}</p>
            )}
            <Button type="submit" name="LOGIN" />
            <p
              style={{
                textAlign: "center",
                paddingTop: "20px",
                color: "yellowgreen",
              }}
            >
              Do not have an Account?{" "}
              <NavLink to="/Register">
                <span
                  style={{
                    color: "white",
                  }}
                >
                  Sign Up
                </span>
              </NavLink>{" "}
            </p>
            <Link to="/resetPassword">
              <h5
                style={{
                  textAlign: "center",
                  paddingTop: "20px",
                  textDecoration: "underline",
                  color: "whitesmoke",
                }}
              >
                I forgot my password!
              </h5>
            </Link>
          </div>
        </form>
      </div>
      <div className="login-img"></div>
      {loading && <Loading />}
    </div>
  );
};
export default LoginPage;
