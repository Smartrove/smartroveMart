import React, { useEffect, useState } from "react";
import styles from "./product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch } from "react-redux";
import {
  storeProducts,
  getPriceRange,
} from "../../redux/features/productSlice";
import spinner from "../../assets/spinner.jpg";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Product = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    dispatch(
      storeProducts({
        products: data,
      })
    );

    dispatch(
      getPriceRange({
        products: data,
      })
    );
  }, [data, dispatch]);
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          <ProductFilter data={data} />
        </aside>

        <div className={styles.content}>
          {isLoading ? (
            <img src={spinner} alt="" width="20px" className="--center-all" />
          ) : (
            <ProductList data={data} />
          )}

          <div className={styles.icon} onClick={toggleFilter}>
            <FilterAltIcon style={{ fontSize: "28px" }} />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
