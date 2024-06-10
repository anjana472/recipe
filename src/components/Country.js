import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import './Country.css';

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [recipes, setRecipes] = useState([]);
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        setCountries(response.data.meals || []);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchRecipesByCountry = async () => {
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`);
          setRecipes(response.data.meals || []);
        } catch (error) {
          console.error('Error fetching recipes by country', error);
        }
      };

      fetchRecipesByCountry();
    }
  }, [selectedCountry]);

  const toggleFavorite = (recipe) => {
    if (favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      dispatch(removeFavorite(recipe.idMeal));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <div className="country-page">
      <h1>Recipes by Country</h1>
      <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
        <option value="">Select a Country</option>
        {countries.map((country, index) => (
          <option key={index} value={country.strArea}>{country.strArea}</option>
        ))}
      </select>
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

export default Country;
