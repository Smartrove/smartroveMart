import React, { useCallback, useEffect, useState } from "react";
import styles from "./productFilter.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByCategory,
  filterByBrand,
  filterByPrice,
} from "../../../redux/features/filterSlice";

const ProductFilter = ({ data }) => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(7000);
  const { filteredProduct } = useSelector((store) => store["filter"]);

  const { minPrice } = useSelector((store) => store["product"]);
  const { maxPrice } = useSelector((store) => store["product"]);

  const dispatch = useDispatch();

  const allCategories = ["All", ...new Set(data.map((item) => item.category))];
  const allBrands = ["All", ...new Set(data.map((item) => item.brand))];

  // console.log(allBrands);

  const filterAllProduct = useCallback(
    (cat) => {
      if (cat !== category) {
        setCategory(cat);

        dispatch(
          filterByCategory({
            data,
            category: cat,
          })
        );
      }
    },
    [dispatch, data, category]
  );

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  useEffect(() => {
    dispatch(
      filterByBrand({
        data,
        brand,
      })
    );
  }, [dispatch, brand]);
  useEffect(() => {
    dispatch(
      filterByPrice({
        data,
        price,
      })
    );
  }, [dispatch, price]);

  useEffect(() => {
    filterAllProduct(category);
  }, [filterAllProduct, category]);

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories &&
          allCategories?.map((cat, index) => {
            return (
              <button
                key={index}
                type="button"
                className={`${category}` === cat ? `${styles.active}` : null}
                onClick={() => filterAllProduct(cat)}
              >
                &#8250; {cat}
              </button>
            );
          })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          name="brand"
          defaultValue={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {allBrands.map((brand, index) => {
            return (
              <option value={brand} key={index}>
                {brand}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>

        <div className={styles.price}>
          <input
            type="range"
            name="price"
            max={maxPrice}
            min={minPrice}
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <br />

        <button className="--btn --btn-danger" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
