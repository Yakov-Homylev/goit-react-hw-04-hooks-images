import React from "react";
import TailSpin from "react-loader-spinner";
import { LoaderContainer } from "./Loader.styled";

function Loader() {
  return (
    <LoaderContainer>
      <TailSpin
        type="TailSpin"
        arialLabel="loading-indicator"
        color="#3f51b5"
      />
    </LoaderContainer>
  );
}

export default Loader;
