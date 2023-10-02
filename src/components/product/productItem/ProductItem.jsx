import React from "react";
import styles from "./productItem.module.scss";
import Card from "../../card/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToCart,
  calculateTotalQuantity,
} from "../../../redux/features/cartSlice";

const ProductItem = ({ grid, item, id, name, price, desc, imageUrl }) => {
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(calculateTotalQuantity());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}

        <button
          className="--btn --btn-danger"
          onClick={() => handleAddToCart(item)}
        >
          Add To Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
