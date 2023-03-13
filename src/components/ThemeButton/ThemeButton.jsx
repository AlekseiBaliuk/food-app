import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import styles from "./ThemeButton.module.css";

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={theme ? { backgroundColor: "#12343b" } : {}}
      className={styles.themeBtn}
      onClick={() => setTheme(!theme)}
    >
      Change theme
    </button>
  );
};

export default ThemeButton;
