import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";

export const Loader = ({ loading, loadingOnModal }) => {
  let [color, setColor] = useState("#ffffff");

  const override = {
    background: "transparent",
    position: "absolute",
    left: "50%",
    top: "50%",
    zIndex: "1000",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // border: "1px solid red",
        // height:'300px',
      }}
    >
      <BeatLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={70}
      />
    </div>
  );
};

export const ModalLoader = ({ loadingOnModal, action,height }) => {
  let [color, setColor] = useState("#ffffff");

  const override = {
    background: "transparent",
    position: "absolute",
    left: "50%",
    top: "80%",
  };
  const container = {
    background: "#00000088",
    display: loadingOnModal ? "flex" : "none",
    position: "absolute",
    zIndex: 100,
    flexDirection: "column",
    width: "100%",
    height: height,
    alignItems: "center",
    justifyContent: "center",
    
  };

  return (
    <div style={container}>
      <ClipLoader
        color={color}
        loading={loadingOnModal}
        cssOverride={{}}
        size={150}
      />
      <p style={{ fontSize: "22px", letterSpacing: 2, marginTop: "28px" }}>
        {action.toUpperCase()} ...
      </p>
    </div>
  );
};
