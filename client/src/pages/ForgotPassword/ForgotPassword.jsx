import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import "./forgotPassword.css";
import Button from "../../components/Templates/Button/Button";
import InputPassword from "../../components/Templates/InputField/InputPassword";
import validateFields from "./validateFields";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const { id } = useParams();
  const [values, setValues] = useState({ password: "", passwordAgain: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(false);
  const [validLink, setValidLink] = useState(false);
  const token = location.search.split("=")[1];
  const alert = useAlert();
  const navigate = useNavigate();

  const userValid = async () => {
    const res = await fetch(
      `${process.env.BASE_SERVER_URL}/api/auth/verifyUser/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!data.success) {
      setValidLink(true);
    }
  };
  useEffect(() => {
    userValid();
  }, []);
  const setVal = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const value = {
    password: values.password,
  };

  const sendPassword = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateFields(values);
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
    } else {
      const res = await fetch(
        `${process.env.BASE_SERVER_URL}/api/auth/changePassword/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      const data = await res.json();

      if (data.success == true) {
        setMessage(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        alert.error("ERROR-Check Your Information");
      }
    }
  };
  return (
    <>
      {validLink ? (
        <div className="reset-page">
          <div className="reset-container">
            <div className="reset-box">
              <h2 style={{ textAlign: "center", color: "red" }}>
                The link has been expired
              </h2>
              <h3 style={{ textAlign: "center" }}>
                Please click bottom link to get new link.
              </h3>

              <p style={{ textAlign: "center" }}>
                <NavLink to="/resetPassword">Make new link</NavLink>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="reset-page">
          <div className="reset-container">
            <div className="reset-box">
              {message ? (
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Password is successfully updated
                </p>
              ) : (
                ""
              )}
              <h2 style={{ textAlign: "center" }}>Enter Your NEW Password!</h2>
              <form className="loginInputs">
                <InputPassword
                  onChange={setVal}
                  name="password"
                  id="password"
                  placeholder="Enter Your new password"
                />
                {errors.password && (
                  <p style={{ textAlign: "center" }}>{errors.password}</p>
                )}
                <InputPassword
                  onChange={setVal}
                  name="passwordAgain"
                  id="password"
                  placeholder="Confirm your new password"
                />
                {errors.passwordAgain && (
                  <p style={{ textAlign: "center" }}>{errors.passwordAgain}</p>
                )}
                <Button onClick={sendPassword} name="Sent" />
              </form>
              <p style={{ textAlign: "center" }}>
                <NavLink to="/">Home</NavLink>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
