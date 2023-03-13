import React, { useContext } from "react";
import { ThemeContext } from "../../App";
// import Button from "../Button/Button";
import styles from "./FavoriteCard.module.css";

const FavoriteCard = ({ image, title, removeFromFavorites }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles.card}>
      <div>
        <img src={image} alt="title" />
      </div>
      <p style={theme ? { color: "#12343b" } : {}} className={styles.title}>
        {title}
      </p>
      {/* <Button text="Remove from favorites" handler={removeFromFavorites} /> */}
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="button"
        className={styles.btn}
        onClick={removeFromFavorites}
      >
        Remove from favorites
      </button>
    </div>
  );
};

export default FavoriteCard;
