import React, { useState } from 'react';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (criteria: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <div>
      <div className="searchBar">
        <svg
          aria-hidden="true"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          style={{ display: 'inline-block', verticalAlign: 'text-bottom', overflow: 'visible' }}
        >
          <path
            fillRule="evenodd"
            d="M10.139 3.5a6.639 6.639 0 100 13.278 6.639 6.639 0 000-13.278zM2 10.139a8.139 8.139 0 1114.4 5.2l5.38 5.38a.75.75 0 11-1.06 1.061l-5.38-5.38A8.139 8.139 0 012 10.139z"
          ></path>
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Look for one or multiple ingredients (comma-separated), or the number of a recipe"
        />
        <button onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
