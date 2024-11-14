import React from "react";
import logo from '/assets/dist/img/AdminLTELogo.png'

const Preloader = () => {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <img
        className="animation__shake"
        src={logo}
        alt="AdminLTELogo"
        height="60"
        width="60"
      />
    </div>
  );
};

export default Preloader;
