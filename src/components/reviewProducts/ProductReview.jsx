import React from "react";
import styles from "./productReview.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import Card from "../card/Card";
import { db } from "../../firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
// import useFetchDoc from "../../customHooks/useFetchDoc";
// import { useEffect } from "react";
import spinner from "../../assets/spinner.jpg";

const ProductReview = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  // const [product, setProduct] = useState(null);

  const { id } = useParams();
  const { userId, userName } = useSelector((store) => store["auth"]);
  const { products } = useSelector((store) => store["product"]);

  const product = products.filter((item) => item.id === id);

  const [{ name, imageUrl }] = product;
  // const { document } = useFetchDoc({
  //   collectionName: "products",
  //   documentId: id,
  // });

  // console.log(document);

  // useEffect(() => {
  //   setProduct(document);
  // }, [document]);
  const submitReview = async (e) => {
    e.preventDefault();
    const orderDate = new Date();
    const date = orderDate.toDateString();
    const reviewConfig = {
      userId,
      userName,
      id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      const docRef = await addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.code);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        {product === null ? (
          <img src={spinner} alt={name} className="--center-all" />
        ) : (
          <>
            <h4>Rate this product</h4>
            <p>Product Name: {name}</p>
            <img src={imageUrl} alt={name} width="100px" />

            <Card cardClass={styles.card}>
              <form onSubmit={(e) => submitReview(e)}>
                <label
                  htmlFor="
            "
                >
                  Rating
                </label>
                <StarsRating
                  value={rate}
                  onChange={(rate) => {
                    setRate(rate);
                  }}
                />

                <label htmlFor="">Review:</label>
                <textarea
                  value={review}
                  required
                  cols="30"
                  rows="10"
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>

                <button className="--btn --btn-primary" type="submit">
                  Submit Rating
                </button>
              </form>
            </Card>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductReview;
