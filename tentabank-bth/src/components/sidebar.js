import React, { useState, useEffect } from 'react';
import './sidebar.css';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        console.log('Data:', data);
        setCategories(data.categories);
        setFilteredCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = categories.filter((category) =>
    category.cource_code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="container">
      <button onClick={toggleSidebar} className="toggle-btn">
        {isVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
        <input
          type="text"
          placeholder="Search categories"
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul className="category-list">
          {Array.isArray(filteredCategories) &&
                filteredCategories.map((category) => (
                <li key={category.name}>{category.name}</li>
    ))}
</ul>
      </div>
    </div>
  );
};

export default Sidebar;
