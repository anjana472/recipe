import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Favourite from './components/Favourite';
import AllItems from './components/AllItems';
import Country from './components/Country';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/all" element={<AllItems />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/country" element={<Country />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
