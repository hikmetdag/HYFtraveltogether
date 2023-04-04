import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({ type, name, style, onClick }) => {
  return (
    <div className="btnDiv">
      <button className="button" type={type} style={style} onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
