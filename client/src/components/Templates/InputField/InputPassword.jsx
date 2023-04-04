import React, { useState } from "react";
import "./inputPassword.css";
import PropTypes from "prop-types";
import show from "../../../../public/1.svg";
import hide from "../../../../public/2.svg";

const InputPassword = ({
  name,
  value,
  style,
  placeholder,
  handleChange,
  ...rest
}) => {
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <div className="pwd-box">
      <input
        className="inputField"
        placeholder={placeholder}
        name={name}
        value={value}
        type={isRevealPwd ? "text" : "password"}
        onChange={handleChange}
        style={style}
        {...rest}
      />
      <img
        title={isRevealPwd ? "Hide password" : "Show password"}
        src={isRevealPwd ? show : hide}
        onClick={() => setIsRevealPwd((prevState) => !prevState)}
      />
      {/* <h5 className="validation-errors">{state.validationErrs[name]}</h5> */}
    </div>
  );
};

InputPassword.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  handleChange: PropTypes.func,
  state: PropTypes.object,
};

export default InputPassword;
