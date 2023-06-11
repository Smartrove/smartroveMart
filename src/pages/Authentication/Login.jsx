import React from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Card from "../../components/card/Card";

const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login" width="400" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="--btn --btn-primary --btn-block">Login</button>
            <div className={styles.links}>
              <Link to="/reset-password">Reset Password</Link>
            </div>
            <p> -- or -- </p>
          </form>
          <button className="--btn --btn-danger --btn-block">
            <GoogleIcon style={{ fontSize: "28px", marginRight: "10px" }} />
            Login With Google
          </button>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register" style={{ marginLeft: "5px" }}>
              Register
            </Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;
