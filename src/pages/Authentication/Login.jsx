import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const notify = (text) => toast(text);
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    if (email === "") {
      notify("Email is required, Kindly fill all fields");
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      notify("Email is not valid");
      return false;
    }

    if (password === "") {
      notify("Password is required, Kindly fill all fields");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password should not be less than 6 characters");
      return false;
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === false) {
          toast.warning("please verify your email address");
          setIsLoading(false);
          return;
        }
        toast.success("sign in successful");
        setIsLoading(false);

        navigate("/");
      })
      .catch((error) => {
        error.code = "user not found or incorrect password";
        toast.error(error.code);
        setIsLoading(false);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        toast.success("login successful");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        errorCode = "invalid credentials";
        toast.error(errorCode);
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Email"
                required
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset-password">Reset Password</Link>
              </div>
              <p> -- or -- </p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
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
    </>
  );
};

export default Login;
