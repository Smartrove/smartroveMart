import React, { useState } from "react";
import styles from "./productList.module.scss";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";

const ProductList = ({ data }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icon}>
          <GridViewIcon
            style={{ fontSize: "28px", color: "orangered", cursor: "pointer" }}
            onClick={() => setGrid(true)}
          />

          <ListAltIcon
            style={{ fontSize: "30px", color: "#0066d4", cursor: "pointer" }}
            onClick={() => setGrid(false)}
          />

          <p>
            <b>{data.length}</b> products found
          </p>
        </div>

        <div>
          <Search
            value={search}
            onChange={({ target }) => setSearch(target.vale)}
          />
        </div>
        <div className={styles.sort}>
          <label htmlFor="sort">Sort by:</label>
          <select name="category">
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {data.length === 0 ? (
          <h2>No product found</h2>
        ) : (
          <>
            {data &&
              data?.map((item, index) => {
                return (
                  <div key={item.id}>
                    <ProductItem {...item} grid={grid} item={item} />
                  </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
