import React from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <p>Already have an account?</p>
            <Link to="/login" style={{ marginLeft: "5px" }}>
              Login
            </Link>
          </span>
          <button
            className="--btn --btn-danger --btn-block"
            style={{ marginTop: "15px" }}
          >
            <GoogleIcon style={{ fontSize: "28px", marginRight: "10px" }} />
            Login With Google
          </button>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="login" width="400" />
      </div>
    </section>
  );
};

export default Register;
