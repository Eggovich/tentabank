import React, { useState, useEffect, useCallback } from 'react';
import {useCookies} from 'react-cookie'
import { NavLink } from 'react-router-dom';
import './browse.css';
import Sidebar from "..//components/sidebar";
import Comments from "..//components/comments";
import img from "..//components/bilder/img-8.png";


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
  const [showComments, setShowComments] = useState({});
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
          akronym: file.exam_id
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
      if (searchTerm && !file.cource_code.toLowerCase().includes(searchTerm.toLowerCase())) {
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
  
  const handleExamClick = (exam) => {
    setSelectedExam(exam);
  }


  return (
    cookies.loggedIn ? 
    (cookies.uploads > 2 ? 
      (!selectedExam ? 
        (<div className="browse-page">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e)=>handleSearch(e)}
          />
          <select
            value={sortBySubject}
            onChange={(e) => setSortBySubject(e.target.value)}
          >
            <option value="">Sort by Subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}
          >
            <option value="">Sort by Date</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <select
            value={sortByGrade}
            onChange={(e) => setSortByGrade(e.target.value)}
          >
            <option value="">Sort by Grade</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
        <div className="table-wrapper">
        <table className="file-table">
          <thead>
            <tr className='browse-display'>

              <th>Kurskod</th>
              <th>Datum</th>
              <th>Betyg</th>
              <th>Akronym</th>
              <th>Länk</th>
              <th>Kommentarer</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((file) => (
              <>
                <tr key={file.id}>
                  <td>{file.subject}</td>
                  <td>{file.date}</td>
                  <td>{file.grade}</td>
                  <td>{file.exam_id}</td>
                  <td>
                    <a href={file.file_data}>
                      Ladda ner
                    </a>
                  </td>
                  <td>
                    <button type="button" onClick={() => setShowComments((prevState) => ({...prevState, [file.id]: !prevState[file.id]}))}>
                      Visa kommentarer
                    </button>
                  </td>
                  <td>
                  <button key={file.id} onClick={() => handleExamClick(file)}>
                    Tenta sidan
                    </button>
                  </td>
                </tr>
                {showComments[file.id] && (
                  <tr>
                    <td colSpan="6">
                      <Comments examId={file.id} userId={cookies.user_id} />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* Replace this part with your exam cards logic and structure */}
        {filteredData.map((exam) => (
          <div key={exam.id} onClick={() => handleExamClick(exam)}>
            {/* Render exam card content here */}
          </div>
        ))}
      </div>
    </div>
    
  )
  :
  (
    // Exam card component
    <div>
      <button classname="" onClick={() => setSelectedExam(null)}>Go back to exam list</button>
      <h1>{selectedExam.name}</h1>
      <p>Course Code: {selectedExam.cource_code}</p>
      <p>Exam Date: {selectedExam.exam_date}</p>
      <p>Grade: {selectedExam.grade}</p>
      <p>Anonymity Code: {selectedExam.exam_id}</p>
      <iframe>
        Tentan
      </iframe>
      {/* Add more exam details here, or import a separate ExamDetails component */}
      
    </div>
  ))

  :
  (<p>Lämna tre tentor för att komma åt sidan.</p>)) 
  
  :
    (
      <div className='error-message'>
        <h3>Du behöver logga in</h3>
        <NavLink to="/login">Logga in</NavLink>
      </div>
    )
  );
  
};

export default Browse;

