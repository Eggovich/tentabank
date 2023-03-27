import React, { useState, useEffect } from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
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
      <div className="sidebar">
        <input
          className='input-sidebar'
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
  );
};

export default Sidebar;
