import React, { useState, useEffect } from "react";
import "./resetPassword.css";
import Button from "../../components/Templates/Button/Button";
import Input from "../../components/Templates/InputField/Input";
import Validation from "./Validation";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [value, setValue] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const setVal = (e) => {
    setValue({
      ...value,
      email: e.target.value,
    });
  };

  useEffect(() => {
    setErrors(Validation(value));
  }, [value]);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && value.email !== "") {
      const res = await fetch(
        `${process.env.BASE_SERVER_URL}/api/auth/sendLink`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      const data = await res.json();

      if (data.status == 201) {
        setMessage(true);
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setMessage(true);
      }
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-container">
        <div className="reset-box">
          <h2 style={{ textAlign: "center" }}>Reset Your Password!</h2>
          {message ? (
            <p
              style={{
                color: "#ffbe18",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              If we know this e-mail address we have sent an e-mail with a link
            </p>
          ) : (
            ""
          )}
          <form className="loginInputs">
            <Input
              onChange={setVal}
              name="email"
              placeholder="write your email"
            />
            {errors.email && (
              <p style={{ textAlign: "center" }}>{errors.email}</p>
            )}

            <Button name="Submit" onClick={sendEmail} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
