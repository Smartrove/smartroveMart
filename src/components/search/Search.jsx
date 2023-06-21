import React from "react";
import styles from "./search.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <SearchIcon style={{ fontSize: "20px" }} className={styles.icon} />
      <input
        type="text"
        placeholder="search by name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
