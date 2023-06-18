import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const AdminOnlyRoute = ({ children }) => {
  const { email } = useSelector((store) => store["auth"]);
  if (email === "olaokunolalekan@gmail.com") {
    return children;
  }
  return (
    <section style={{height: '80vh'}}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This page can only be viewed by an admin</p>
        <Link to='/'>
          <button className="--btn">&larr; Back to Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const { email } = useSelector((store) => store["auth"]);
  if (email === "olaokunolalekan@gmail.com") {
    return children;
  }

  return null;
 
};


