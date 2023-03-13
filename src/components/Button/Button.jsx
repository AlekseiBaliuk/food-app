import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, handler }) => {
  return (
    <button type="button" className={styles.btn} onClick={handler}>
      {text}
    </button>
  );
};

export default Button;
