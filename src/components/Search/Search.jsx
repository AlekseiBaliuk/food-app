import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import styles from "./Search.module.css";

const Search = ({ getDataFromSearch, apiCallSuccess, setApiCallSuccess }) => {
  const [inputValue, setInputValue] = useState("");
  const { theme } = useContext(ThemeContext);

  const handleInputValue = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  // console.log(inputValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    getDataFromSearch(inputValue);
  };

  useEffect(() => {
    if (apiCallSuccess) {
      setInputValue("");
      setApiCallSuccess(false);
    }
  }, [apiCallSuccess, setApiCallSuccess]);

  return (
    <div>
      <form
        className={styles.search}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          type="text"
          className={styles.searchInput}
          name="search"
          placeholder="Search recipes"
          id="search"
          value={inputValue}
          onChange={handleInputValue}
        />
        <button
          style={theme ? { backgroundColor: "#12343b" } : {}}
          className={styles.btn}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
