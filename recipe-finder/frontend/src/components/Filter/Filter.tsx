import React from "react";
import "./Filter.scss";

interface FilterProps {
  onFilterChange: (criteria: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter">
      <select className="filter__select" onChange={handleFilterChange}>
        <option className="filter__select__option" value="default">Sort by default</option>
        <option className="filter__select__option" value="time">Sort by prep time</option>
        <option className="filter__select__option" value="alphabetically">Sort alphabetically</option>
      </select>
    </div>
  );
};

export default Filter;
