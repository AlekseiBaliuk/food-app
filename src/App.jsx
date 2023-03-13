import { createContext, useState } from "react";
import "./App.css";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import HomePage from "./pages/HomePage";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
        <ThemeButton />
        <HomePage />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
