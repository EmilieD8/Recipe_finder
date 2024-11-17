import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import RecipePage from './components/RecipePage/RecipePage.tsx';
import Header from './components/Header/Header.tsx';

const App:React.FC = () => {
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
