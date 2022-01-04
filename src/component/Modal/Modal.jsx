import React, { useEffect } from "react";
import { Overlay, ModalContainer } from "./Modal.styled";
import PropTypes from "prop-types";

function Modal({ onEsc, onBackdropClick, bigImage, alt }) {
  useEffect(() => {
    function onEscClick(e) {
      if (e.code !== "Escape") {
        return;
      }
      onEsc();
    }
    window.addEventListener("keydown", onEscClick);
    return () => {
      window.removeEventListener("keydown", onEscClick);
    };
  }, [onEsc]);

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalContainer>
        <img src={bigImage} alt={alt} />
      </ModalContainer>
    </Overlay>
  );
}

Modal.propTypes = {
  onEsc: PropTypes.func,
  bigImage: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Modal;
