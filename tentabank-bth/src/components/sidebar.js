import React, { useState, useEffect } from 'react';
import './sidebar.css';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch categories from your API
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        setCategories(data);
        setFilteredCategories(data);
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
            className='input-sidebar'
          type="text"
          placeholder="Search categories"
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul className="category-list">
        {
            Array.isArray(filteredCategories) && filteredCategories.map((category) => (
                <li key={category.cource_code}>{category.cource_code}</li>
                ))
                    }
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
