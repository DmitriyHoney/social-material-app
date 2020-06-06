import React from "react";
import preloaderSVG from "./../../../assets/images/prelodader.svg";

const Preloader = props => {
    return (
        <div>
            <img src={preloaderSVG} alt="preloader"/>
        </div>
    );
};

export default Preloader;