import React, { useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("password does not match");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error(
        "Email is not a valid email address, Kindly enter a valid email address"
      );
      return false;
    }

    if (password === "" || password.length < 7) {
      toast.error("Password is required, and must be at least 8 characters");
      return false;
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
      toast.error(
        "Password must have a minimum of 8 characters, at least one uppercase, one lowercase letter, special character and one number"
      );
      return false;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        toast.success("registration successful");

        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          toast.success("please verify your email address");
        });
        // console.log(user);

        navigate("/login");
        setIsLoading(false);
        // ...
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
        // ..
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
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
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
              onClick={signInWithGoogle}
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
    </>
  );
};

export default Register;
