import React, { useState } from "react";
import styles from "./pagination.module.scss";
const Pagination = ({
  productsPerPage,
  currentPage,
  setCurrentPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;

  //paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //go to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);

    //show next part of the page numbers
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
  };
  //go to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
  };

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}
      >
        Prev
      </li>
      {pageNumbers &&
        pageNumbers?.map((number, index) => {
          if (number < maxPageLimit + 1 && number > minPageLimit) {
            return (
              <li
                key={index}
                className={currentPage === number ? `${styles.active}` : null}
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            );
          }
        })}
      <li
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : null
        }
      >
        Next
      </li>
      <p>
        <b
          className={styles.page}
          style={{ fontWeight: "800" }}
        >{`page ${currentPage}`}</b>
        <span> {` of `}</span>
        <b style={{ fontWeight: "800" }}>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
