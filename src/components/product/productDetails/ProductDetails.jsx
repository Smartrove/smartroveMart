import React, { useEffect, useState } from "react";
import styles from "./productDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import spinner from "../../../assets/spinner.jpg";
import {
  addToCart,
  decreaseCart,
  calculateTotalQuantity,
} from "../../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useFetchDoc from "../../../customHooks/useFetchDoc";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store["cart"]);
  const { document } = useFetchDoc({
    collectionName: "products",
    documentId: id,
  });

  const { data } = useFetchCollection("reviews");
  const filteredReview = data.filter((review) => review.id === id);

  const isCartAdded = cartItems.findIndex((item) => {
    return item.id === id;
  });

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(calculateTotalQuantity());
  };

  const decreaseCartItems = (cart) => {
    dispatch(decreaseCart(cart));
    dispatch(calculateTotalQuantity());
  };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back to Products</Link>
        </div>
        {product === null ? (
          <img src={spinner} alt="spinner" className="--center-all" />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3 style={{ marginTop: "10px" }}>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b style={{ fontWeight: "800" }}>SKU: </b>
                  <span>{product.id}</span>
                </p>
                <p>
                  <b style={{ fontWeight: "800" }}>Brand: </b>
                  <span>{product.brand}</span>
                </p>

                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        style={{ backgroundColor: "lightgray" }}
                        onClick={() => decreaseCartItems(product)}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <p style={{ fontWeight: "800" }}>
                        {cartItems[0].cartQuantity}
                      </p>
                      <button
                        className="--btn"
                        style={{ backgroundColor: "lightgray" }}
                        onClick={() => handleAddToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="--btn --btn-danger"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </>
        )}

        <Card cardClass={styles.card}>
          <h3>Product Review</h3>
          <div>
            {filteredReview.length === 0 ? (
              <p>No review available</p>
            ) : (
              <>
                {filteredReview &&
                  filteredReview?.map((item, index) => {
                    const { rate, review, reviewDate, userName, email } = item;

                    return (
                      <>
                        <div className={styles.review} key={index}>
                          <StarsRating value={rate} />
                          <p>{review}</p>
                          <span style={{ fontWeight: "500" }}>
                            {reviewDate}
                          </span>
                          <br />
                          <span style={{ fontWeight: "500" }}>
                            by: {userName === null ? email : userName}
                          </span>
                        </div>
                      </>
                    );
                  })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
