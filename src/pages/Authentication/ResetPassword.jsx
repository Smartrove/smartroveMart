import React, { useState } from "react";
import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();

    if (email === "") {
      toast.warning("email cannit be empty");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error(
        "Email is not a valid email address, Kindly enter a valid email address"
      );
      return false;
    }
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toast.warning("link to password reset sent to your mail");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        errorCode = "reset failed";
        toast.error(errorCode);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
              <input
                type="email"
                placeholder="Email"
                required
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                reset password
              </button>
              <div className={styles.links}>
                <span className={styles.register}>
                  <Link to="/login"> -Login</Link>
                </span>
                <span className={styles.register}>
                  <Link to="/register" style={{ marginLeft: "5px" }}>
                    -Register
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default ResetPassword;
