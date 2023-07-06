import React, { useRef } from "react";
import styles from "./contact.module.scss";
import Card from "../../components/card/Card";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
          e.target.reset();
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };
  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>

        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                name="user_name"
                required
              />
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter active email"
                name="email"
                required
              />
              <label htmlFor="">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                name="subject"
                required
              />
              <label htmlFor="">Subject</label>
              <textarea name="message" id="" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via the listed channels</p>
              <div className={styles.icon}>
                <p>
                  <span>
                    <LocalPhoneIcon
                      style={{ paddingRight: "2px", fontSize: "25px" }}
                    />
                    +2348168800815
                  </span>
                </p>
                <p>
                  <span>
                    <EmailIcon
                      style={{ paddingRight: "2px", fontSize: "25px" }}
                    />
                    olaokunolalekan@gmail.com
                  </span>
                </p>
                <p>
                  <span>
                    <LocationOnIcon
                      style={{ paddingRight: "2px", fontSize: "25px" }}
                    />
                    Lagos, Nigeria
                  </span>
                </p>
                <p>
                  <span>
                    <TwitterIcon
                      style={{ paddingRight: "2px", fontSize: "25px" }}
                    />
                    @iamsmartrove
                  </span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
