import React, { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import './browse.css';
import SearchBar from '../components/SearchBar';
import ExamDetails from '../components/ExamDetails';
import ExamsWithoutSolutions from '../components/ExamsWithoutSolutions';
import ExamsWithSolutions from '../components/ExamsWithSolutions';

const Browse = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [dates, setDates] = useState([]);
  const [grades, setGrades] = useState([]);
  const [cookies, setCookie] = useCookies(["User"])
  const [isVisible, setIsVisible] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect( () => {
    if (cookies.loggedIn){
    const formData = new FormData();
    formData.append("user_id", cookies.user_id)
    fetch("http://localhost:5000/getuploads", {
        method: "POST",
        body: formData,
      })
      .then((res) => res.json())
      .then((data) => {
        setCookie("uploads", data.response.uploads)
        }
      )
    }
  }, []
);

  useEffect(() => {
    fetch('http://localhost:5000/accepted_files')
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.files.map(file => ({
          ...file,
          subject: file.cource_code,
          date: file.exam_date,
          grade: file.grade,
          id: file.id,
          akronym: file.exam_id,
          rating: file.rating
        }))
        setData(mappedData);
        setFilteredData(mappedData);
        let subjs = [...new Set(mappedData.map(file => file.cource_code))];
        setSubjects(subjs);
        let dats = [...new Set(mappedData.map(file => file.exam_date))];
        setDates(dats);
        let grds = [...new Set(mappedData.map(file => file.grade))];
        setGrades(grds);
      });
  }, []);

  useEffect(() => {
    const newData = data.filter(file => {
      const termMatch = !searchTerm || file.file_name.toLowerCase().includes(searchTerm.toLowerCase());
      return termMatch;
    });
    setFilteredData(newData);
  }, [searchTerm, data]);

  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleSort = (sortKey) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleFilter = (filterKey, value) => {
    const filtered = value === 'All' ? data : data.filter((file) => file[filterKey] === value);
    setFilteredData(filtered);
  };

  return (
    cookies.loggedIn ? (
      cookies.uploads > 2 ? (
        !selectedExam ? (
                    <>
            <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
            <div className="filter-sort-section">
              <div className="filter">
                <label htmlFor="dateFilter">Filter by date:</label>
                <select
                  id="dateFilter"
                  onChange={(e) => handleFilter('exam_date', e.target.value)}
                >
                  <option>All</option>
                  {dates.map((date, index) => (
                    <option key={index}>{date}</option>
                  ))}
                </select>
              </div>
              <div className="filter">
                <label htmlFor="gradeFilter">Filter by grade:</label>
                <select
                  id="gradeFilter"
                  onChange={(e) => handleFilter('grade', e.target.value)}
                >
                  <option>All</option>
                  {grades.map((grade, index) => (
                    <option key={index}>{grade}</option>
                  ))}
                </select>
              </div>
              <div className="sort">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="exam_date">Date</option>
                  <option value="grade">Grade</option>
                </select>
              </div>
            </div>
            <ExamsWithoutSolutions
              exams={filteredData.filter(exam => !exam.solution)}
              setSelectedExam={setSelectedExam}
            />
            <ExamsWithSolutions
              exams={filteredData.filter(exam => exam.solution)}
              setSelectedExam={setSelectedExam}
            />
          </>
        ) : (
          <ExamDetails
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
          />
        )
      ) : (
        <p>Lämna tre tentor för att komma åt sidan.</p>
      )
    ) : (
      <div className='error-message'>
        <h3>Du behöver logga in</h3>
        <NavLink to="/login">Logga in</NavLink>
      </div>
    )
  );
};

export default Browse;

