import React, { useState } from "react";
import styles from "./pagination.module.scss";
const Pagination = ({
  productsPerPage,
  currentPage,
  setCurrentPage,
  setProductsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  return <div>Pagination</div>;
};

export default Pagination;
