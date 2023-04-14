import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Sök tentor..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
