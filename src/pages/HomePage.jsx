import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeContext } from "../App";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Search from "../components/Search/Search";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [apiCallSuccess, setApiCallSuccess] = useState(false);
  const [visibleFavorites, setVisibleFavorites] = useState([]);
  const { theme } = useContext(ThemeContext);

  const getDataFromSearch = (data) => {
    setLoading(true);
    const getRecipes = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=9e85b1e2302a43a2a8a79d0ab5251a98&query=${data}`
      );
      const result = await res.json();
      const { results } = result;

      if (results && results.length > 0) {
        setLoading(false);
        setRecipes(results);
        setApiCallSuccess(true);
      }
    };

    getRecipes();
  };

  // const addToFavorites = useCallback(
  //   (recipe) => {
  //     let copyFavorites = [...favorites];

  //     const idx = copyFavorites.findIndex((item) => item.id === recipe.id);

  //     if (idx === -1) {
  //       copyFavorites.push(recipe);
  //       setFavorites(copyFavorites);
  //       localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  //     } else {
  //       return alert("Recipe already in favorites.");
  //     }
  //   },
  //   [favorites]
  // );
  const addToFavorites = (recipe) => {
    const idx = favorites.findIndex((item) => item.id === recipe.id);

    let copyFavorites = [...favorites];
    if (idx === -1) {
      copyFavorites.push(recipe);
      setFavorites(copyFavorites);
      setVisibleFavorites(copyFavorites);
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
      window.scrollTo({ top: "0", behavior: "smooth" });
    } else {
      return alert("Recipe already in favorites.");
    }
  };

  const removeFromFavorites = (id) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter((item) => item.id !== id);
    setFavorites(copyFavorites);
    setVisibleFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  };

  useEffect(() => {
    const getFavoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    if (getFavoritesFromStorage) {
      setFavorites(getFavoritesFromStorage);
      setVisibleFavorites(getFavoritesFromStorage);
    }
  }, []);

  const filterFavorite = (e) => {
    const { value } = e.target;

    const filteredFavorites = favorites.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setVisibleFavorites(filteredFavorites);
  };

  // const renderRecipes = useCallback(() => {
  //   if (recipes && recipes.length > 0) {
  //     return recipes.map((item) => (
  //       <RecipeCard
  //         key={item.id}
  //         image={item.image}
  //         title={item.title}
  //         addToFavorite={() => addToFavorites(item)}
  //       />
  //     ));
  //   }
  // }, [addToFavorites, recipes]);

  return (
    <div className="homepage">
      <Search
        getDataFromSearch={getDataFromSearch}
        apiCallSuccess={apiCallSuccess}
        setApiCallSuccess={setApiCallSuccess}
      />

      <div className={styles.favoritesWrapper}>
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className={styles.favoritesTitle}
        >
          Favorites
        </h1>
        <div>
          <input
            className={styles.searchFavorites}
            name="favorite"
            type="text"
            placeholder="Search favorite"
            onChange={filterFavorite}
          />
        </div>

        <div className={styles.favorites}>
          {!visibleFavorites.length && (
            <div className={styles.noItems}>No favorites</div>
          )}
          {visibleFavorites && visibleFavorites.length > 0
            ? visibleFavorites.map((item) => (
                <FavoriteCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                />
              ))
            : null}
        </div>
      </div>

      {loading && (
        <div className={styles.loading}>Loading recipes! Please wait.</div>
      )}

      <div className={styles.items}>
        {/* {renderRecipes()} */}

        {/* {useMemo(
          () =>
            !loading && recipes && recipes.length > 0
              ? recipes.map((item) => (
                  <RecipeCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    addToFavorite={() => addToFavorites(item)}
                  />
                ))
              : null,
          [addToFavorites, loading, recipes]
        )} */}
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeCard
                key={item.id}
                image={item.image}
                title={item.title}
                addToFavorites={() => addToFavorites(item)}
              />
            ))
          : null}
      </div>

      {!loading && !recipes.length && (
        <div className={styles.noItems}>No recipes are found</div>
      )}
    </div>
  );
};

export default HomePage;
