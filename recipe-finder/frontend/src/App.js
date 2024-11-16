import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import RecipePage from './components/RecipePage/RecipePage';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
