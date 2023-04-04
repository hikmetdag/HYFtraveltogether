import React from "react";
import PropTypes from "prop-types";
import "./input.css";

const Input = ({
  name,
  value,
  handleChange,
  style,
  placeholder,
  type,
  label,
  ...rest
}) => {
  return (
    <>
      <input
        className="inputField"
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        onChange={handleChange}
        style={style}
        {...rest}
        label={label}
      />
      {/* <h5 className="validation-errors">{state.validationErrs[name]}</h5> */}
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  state: PropTypes.object,
  label: PropTypes.string,
};

export default Input;
