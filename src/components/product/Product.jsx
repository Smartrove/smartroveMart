import React, { useEffect } from "react";
import styles from "./product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { storeProducts } from "../../redux/features/productSlice";
import spinner from "../../assets/spinner.jpg";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();

  const products = useSelector((store) => store["product"]);
  useEffect(() => {
    dispatch(
      storeProducts({
        products: data,
      })
    );
  }, []);
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>

        <div className={styles.content}>
          {isLoading ? (
            <img src={spinner} alt="" width="20px" className="--center-all" />
          ) : (
            <ProductList data={data} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;
