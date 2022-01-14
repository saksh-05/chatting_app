import React from "react";
import { Loader } from "./styled";
import loading from "../../resources/loading.svg";

const LoadingScreen = () => {
  return (
    <Loader>
      <img src={loading} alt="loading" style={{ height: "100px" }} />
    </Loader>
  );
};

export default LoadingScreen;
