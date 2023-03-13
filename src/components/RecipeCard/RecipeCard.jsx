import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import Button from "../Button/Button";
import styles from "./RecipeCard.module.css";

const RecipeCard = ({ image, title, addToFavorites }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles.card}>
      <div>
        <img src={image} alt="title" />
      </div>
      <p style={theme ? { color: "#12343b" } : {}} className={styles.title}>
        {title}
      </p>
      {/* <Button
        text="Add to favorite"
        handler={addToFavorite}
      /> */}
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="button"
        className={styles.btn}
        onClick={addToFavorites}
      >
        Add to favorite
      </button>
    </div>
  );
};

export default RecipeCard;
