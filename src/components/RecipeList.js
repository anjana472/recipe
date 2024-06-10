import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import SearchBar from './SearchBar';
import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();

  const fetchRecipes = async (query) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      setRecipes(response.data.meals || []);
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error fetching the recipes', error);
    }
  };

  const handleSearch = (query) => {
    fetchRecipes(query);
  };

  const toggleFavorite = (recipe) => {
    if (favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      dispatch(removeFavorite(recipe.idMeal));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <div className="home-page">
      <div className="recipe-search-container">
        <h1>Recipe Search</h1>
        <SearchBar onSearch={handleSearch} />
        {searchPerformed && (
          <div>
            {recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe) => (
                  <div key={recipe.idMeal} className="recipe-item">
                    <Link to={`/recipe/${recipe.idMeal}`}>
                      <h2>{recipe.strMeal}</h2>
                      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    </Link>
                    <button onClick={() => toggleFavorite(recipe)}>
                      {favorites.some((fav) => fav.idMeal === recipe.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
