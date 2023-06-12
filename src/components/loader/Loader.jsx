import React from "react";
import loaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";
import styles from "./loader.module.scss";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="loader" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
