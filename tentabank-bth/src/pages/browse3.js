import React, { useState, useEffect, useCallback } from 'react';
import {useCookies} from 'react-cookie'
import { NavLink } from 'react-router-dom';
import Carditemsexam from '../components/Carditemsexam';
import Comments from '../components/comments';
import './browse3.css';


const Browse = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sortBySubject, setSortBySubject] = useState('');
  const [sortByDate, setSortByDate] = useState('');
  const [sortByGrade, setSortByGrade] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [dates, setDates] = useState([]);
  const [grades, setGrades] = useState([]);
  const [cookies, setCookie] = useCookies(["User"])
  const [sort, setSort] = useState("rating")
  const [isVisible, setIsVisible] = useState(false)
  const [showComments, setShowComments] = useState({});
  const [selectedExam, setSelectedExam] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        setCategories(data.categories);
        setFilteredCategories(data.categories);
        console.log(data.categories)
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

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
        //GCS SOLUTION
        //const mappedData = data.files.map(file => ({
          //...file,
          //subject: file.name.split("/")[0],
          //date: file.name.split("/")[1],
          //grade: file.name.split("/")[2]
        //}))
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
        //let subjs = [...new Set(mappedData.map(file => file.subject))];
        //setSubjects(subjs);
        //let dats = [...new Set(mappedData.map(file => file.date))];
        //setDates(dats);
        //let grds = [...new Set(mappedData.map(file => file.grade))];
        //setGrades(grds);
        let subjs = [...new Set(mappedData.map(file => file.cource_code))];
        setSubjects(subjs);
        let dats = [...new Set(mappedData.map(file => file.exam_date))];
        setDates(dats);
        let grds = [...new Set(mappedData.map(file => file.grade))];
        setGrades(grds);
      });
  }, []);

  const filterFiles = useCallback(() => {
    if (!searchTerm && !sortBySubject && !sortByDate && !sortByGrade) {
      setFilteredData(data);
      return;
    } 
    
    setFilteredData(data.filter(file => {
      if (searchTerm && !file.file_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (sortBySubject && file.cource_code !== sortBySubject) {
        return false;
      }
      if (sortByDate && file.exam_date !== sortByDate) {
        return false;
      }
      if (sortByGrade && file.grade !== sortByGrade) {
        return false;
      }
      return true;
    }));
  }, [data, searchTerm, sortBySubject, sortByDate, sortByGrade]);
  

  useEffect(() => {filterFiles();}, [filterFiles]);
  useEffect(() => {filterFiles();}, [filterFiles]);

  
  function updateDates(data){
    let temp = [];
    console.log(data.length)
    for (let i = 0; i < data.length; i++){
      if (!temp.includes(data[i].exam_date)){
        temp.push(data[i].exam_date)
      }
    }
    setDates(temp)
  }


  function handleSearch(evt){
    updateDates(filteredData);
    setSearchTerm(evt.target.value); 
  }
  

  function handleSort(){
    if (sort === "betyg"){
        setSort("rating")
        filteredData.sort((a, b) => {
            return a.grade - b.grade
        })
    }else{
        setSort("betyg")
        filteredData.sort((a, b) => {
            return a.rating - b.rating
        })
    }
  }


  return (
    cookies.loggedIn ? 
      (cookies.uploads > 0 ? 
        (!selectedExam ? (
        <div className="browse-page3">
          <div className="sidebar3">
            <h1>Ämnen</h1>
            <ul className="category-list">
              {filteredCategories.map((category) => (
                <li key={category.cat}>
                  {category.cat}
                  {category.courses.map((course) => (
                  <li key={course}>{course}</li>
                  ))}
                </li>
                
              ))}
            </ul>
          </div>
          <div className="filter3"><h1>Filter</h1></div>
          <div className='exam_square'>
        
          {filteredData.map((file) => (
              <div onClick={() => setSelectedExam(file)} className="clickable-card">
                <Carditemsexam 
                    courseCode={file.subject}
                    date={file.date}
                    grade={file.grade}
                    /*rating={file.rating}*/
                    rating={3}
                    label="matte"
                    exam_id={file.id}
                  />
              </div>
          ))}
          </div>
        </div>
        ):(
            <div className="exam-details">
              <button className="back-button" onClick={() => setSelectedExam(null)}>Go back to exam list</button>
              <h1>{selectedExam.name}</h1>
              <div className="exam-info">
                <p>Course Code: {selectedExam.cource_code}</p>
                <p>Exam Date: {selectedExam.exam_date}</p>
                <p>Grade: {selectedExam.grade}</p>
                <p>Anonymity Code: {selectedExam.exam_id}</p>
              </div>
              <iframe className="exam-iframe" src={selectedExam.file_data}>
                Tentan
              </iframe>
              <div className="comments-wrapper">
                <Comments examId={selectedExam.id} userId={cookies.user_id} />
              </div>
            </div>

        )
      ):(
      <p>Lämna tre tentor för att komma åt sidan.</p>
      )
    ):(
      <div className='error-message'>
        <h3>Du behöver logga in</h3>
        <NavLink to="/login">Logga in</NavLink>        
      </div>
    )
  );
};

export default Browse;

