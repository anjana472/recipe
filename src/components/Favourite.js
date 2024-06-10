import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavorite } from '../redux/favoritesSlice';

const Favourite = () => {
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Favourite Recipes</h1>
      {favorites.length > 0 ? (
        <div className="recipe-list">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-item">
              <Link to={`/recipe/${recipe.idMeal}`}>
                <h2>{recipe.strMeal}</h2>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              </Link>
              <button onClick={() => dispatch(removeFavorite(recipe.idMeal))}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favourite recipes yet.</p>
      )}
    </div>
  );
};

export default Favourite;
