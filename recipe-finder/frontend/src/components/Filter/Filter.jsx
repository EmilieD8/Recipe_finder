import React from "react";
import "./Filter.css";

const Filter = ({ onFilterChange }) => {
    const handleFilterChange = (e) => {
      onFilterChange(e.target.value);
    };
  
    return (
      <div className="filter">
        <select onChange={handleFilterChange}>
          <option value="default">Sort by default</option>
          <option value="time">Sort by prep time</option>
          <option value="alphabetically">Sort alphabetically</option>
        </select>
      </div>
    );
  };
  
  export default Filter;
  