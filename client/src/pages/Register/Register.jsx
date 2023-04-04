import React, { useState, useEffect } from "react";
import "./Register.css";
import InputPassword from "../../components/Templates/InputField/InputPassword";
import Input from "../../components/Templates/InputField/Input";
import Button from "../../components/Templates/Button/Button";
import Validation from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import { logInfo } from "../../../../server/src/util/logging";
import { useAlert } from "react-alert";
import api from "../../util/api";
import Loading from "../../components/Templates/Loading/Loading";

const RegisterFrom = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    surname: "",
    password: "",
    email: "",
    passwordAgain: "",
  });
  const user = {
    user: {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
    },
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrors(Validation(values));
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      if (
        values.name !== "" &&
        values.email !== "" &&
        values.password !== "" &&
        values.passwordAgain !== ""
      ) {
        try {
          setLoading(true);
          const result = await api.signup(user);
          const res = await result.data;
          logInfo(res);
          if (res.success) {
            setLoading(false);
            alert.success("Successful");
            setTimeout(() => {
              navigate("/login");
            }, 1200);
          } else {
            setLoading(false);
            logInfo("registration failed");
            alert.error("ERROR-Check Your Information");
          }
        } catch (error) {
          logInfo("registration failed");
          setLoading(false);
          alert.error("ERROR-Check Your Information");
        }
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <img
          src="https://visme.co/blog/wp-content/uploads/2020/02/header-1200.gif"
          alt=""
          className="tempo-animation"
        />
        <form onSubmit={handleSubmit} className="account-container">
          <h1 className="create-account-header">CREATE AN ACCOUNT</h1>
          <p className="already-have-account">
            ALREADY HAVE AN ACCOUNT?
            <Link
              to={"/login"}
              style={{
                textDecoration: "underline",
                color: "aqua",
                marginLeft: "10px",
                textTransform: "uppercase",
              }}
            >
              <span>LOG IN</span>
            </Link>
          </p>
          <Input
            handleChange={(e) => handleChange(e)}
            name="name"
            placeholder="First Name"
            value={values.name}
          />
          {errors.name && <p>{errors.name}</p>}
          <Input
            name="surname"
            handleChange={(e) => handleChange(e)}
            placeholder="Last Name"
            value={values.surname}
          />
          <Input
            handleChange={(e) => handleChange(e)}
            name="email"
            placeholder="email"
          />
          {errors.email && <p>{errors.email}</p>}
          <InputPassword
            handleChange={(e) => handleChange(e)}
            name="password"
            placeholder="password"
            values={values.password}
          />
          {errors.password && <p>{errors.password}</p>}
          <InputPassword
            handleChange={(e) => handleChange(e)}
            name="passwordAgain"
            placeholder="password again"
          />
          {errors.passwordAgain && <p>{errors.passwordAgain}</p>}
          <Button name="REGISTER" />
        </form>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default RegisterFrom;
