import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

const AllItems = () => {
  const [recipes, setRecipes] = useState([]);
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error('Error fetching the recipes', error);
      }
    };

    fetchAllRecipes();
  }, []);

  const toggleFavorite = (recipe) => {
    if (favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      dispatch(removeFavorite(recipe.idMeal));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <div>
      <h1>All Recipes</h1>
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
    </div>
  );
};

export default AllItems;
