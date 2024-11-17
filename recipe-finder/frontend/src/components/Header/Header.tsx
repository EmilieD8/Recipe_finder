import React from "react";
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <img src="/logo.png" alt="logo" className="header__logo" />
      <h1 className="header__title">Vegan Food Searcher</h1>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
