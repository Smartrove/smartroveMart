import React, { useEffect, useState } from "react";
import styles from "./productList.module.scss";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBySearch,
  sortProducts,
} from "../../../redux/features/filterSlice";
import Pagination from "../../pagination/Pagination";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const ProductList = () => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(30);
  const { data } = useFetchCollection("products");
  const { data: reviewData } = useFetchCollection("reviews");
  const productId = reviewData.map((review) => review.productId);

  const { filteredProduct } = useSelector((store) => store["filter"]);

  //get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      filterBySearch({
        data,
        search,
      })
    );
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(
      sortProducts({
        data,
        sort,
      })
    );
  }, [data, sort, dispatch]);

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
            <b>{currentProducts.length}</b> products found
          </p>
        </div>

        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label htmlFor="sort">Sort by:</label>
          <select
            name="category"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {currentProducts.length === 0 ? (
          <h2>No product found</h2>
        ) : (
          <>
            {currentProducts.map((item, index) => (
              <div key={item.id}>
                <ProductItem {...item} grid={grid} item={item} />
              </div>
            ))}
          </>
        )}
      </div>

      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setProductsPerPage={setProductsPerPage}
        totalProducts={data.length}
      />
    </div>
  );
};

export default ProductList;
