import React from "react";
import { LoadButton } from "./Button.styled";
import PropTypes from "prop-types";

function Button({ name = "Click", onClick }) {
  return <LoadButton onClick={onClick}>{name}</LoadButton>;
}

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
