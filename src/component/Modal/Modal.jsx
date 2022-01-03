import React, { Component } from "react";
import { Overlay, ModalContainer } from "./Modal.styled";
import PropTypes from "prop-types";

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscClick);
  }

  onEscClick = (e) => {
    if (e.code !== "Escape") {
      return;
    }
    this.props.onEsc();
  };

  render() {
    return (
      <Overlay onClick={this.props.onBackdropClick}>
        <ModalContainer>
          <img src={this.props.bigImage} alt={this.props.alt} />
        </ModalContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onEsc: PropTypes.func,
  bigImage: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Modal;
