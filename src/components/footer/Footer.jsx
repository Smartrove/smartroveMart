import React from "react";
import styles from "./footer.module.scss";

const date = new Date();
const appCurrentYear = date.getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; {appCurrentYear} Smartrove || All Rights Reserved
    </div>
  );
};

export default Footer;
