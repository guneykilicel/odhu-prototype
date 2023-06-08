import React from "react";
import { Link } from "react-router-dom";
import logoo from "./odhu.png";

export const Logo = () => {
  return (
    <Link to="/" style={{ display: "flex", height: "4rem" }}>
      <img
        src={logoo}
        alt="logo"
      />
    </Link>
  );
};