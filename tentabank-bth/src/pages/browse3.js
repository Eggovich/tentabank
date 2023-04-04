import React, { useState, useEffect, useCallback } from 'react';
import {useCookies} from 'react-cookie'
import { NavLink } from 'react-router-dom';
import Carditemsexam from '../components/Carditemsexam';
import Comments from '../components/comments';
import Setstarrating from '../components/Setstarrating';
import './browse3.css';


const Browse = () => {
  const [data, setData] = useState([]);
  const [subjectSearch, setSubjectSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sortBySubject, setSortBySubject] = useState('');
  const [sortByDate, setSortByDate] = useState('');
  const [sortByGrade, setSortByGrade] = useState('');
  const [subjects, setSubjects] = useState([])
  const [dates, setDates] = useState([]);
  const [grades, setGrades] = useState([]);
  const [cookies, setCookie] = useCookies(["User"])
  const [sort, setSort] = useState("rating")
  const [selectedExam, setSelectedExam] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [show, setShow] = useState(false);

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
    const formData = new FormData()
    formData.append("name", sortBySubject)
    fetch('http://localhost:5000/accepted_files', {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        //GCS SOLUTION
        //const mappedData = data.files.map(file => ({
          //...file,
          //subject: file.name.split("/")[0],
          //date: file.name.split("/")[1],
          //grade: file.name.split("/")[2]
        //}))
        var mappedData = data.files.map(file => ({
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
        let subjs = []
        for (let i=0; i<data.courses.length; i++){
          subjs.push(data.courses[i].cource_code)
        }
        setSubjects(subjs);
        setFilteredSubjects(subjs)
        let dats = [...new Set(mappedData.map(file => file.exam_date))];
        setDates(dats);
        let grds = [...new Set(mappedData.map(file => file.grade))];
        setGrades(grds);
      });
  }, [sortBySubject]);


  const filterFiles = useCallback(() => {
    var temp = []
    if (/*!searchTerm&&*/ !sortBySubject && !sortByDate && !sortByGrade /*&& !sortByCategory*/) {
      let dats = [...new Set(data.map(file => file.exam_date))];
      setDates(dats);
      handleSort(data)
      return;
    } 
    
    var mappedData = data.filter(file => {
      /*
      if (searchTerm && !file.cource_code.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        return false;
      }
      */
      if (sortByGrade && file.grade !== sortByGrade) {
        return false;
      }
      /*
      if (sortByCategory && file.cource_code.slice(0,2) !== sortByCategory) {
        return false;
      }
      */
      if (!temp.includes(file.exam_date)){
        temp.push(file.exam_date)
      }
      if (sortByDate && file.exam_date !== sortByDate) {
        return false;
      }
      return true;
    });
    setDates(temp)
    handleSort(mappedData)
  }, [data/*, searchTerm, sortBySubject*/, sortByDate, sortByGrade/*, sortByCategory*/, sort]);
  

  useEffect(() => {filterFiles();}, [filterFiles]);


  const filterSubjects = useCallback(() => {
    if (!subjectSearch) {
      setSubjects(subjects)
      return;
    } 
    setFilteredSubjects(subjects.filter(subject => {
      return subject.toLowerCase().startsWith(subjectSearch.toLowerCase());
    }))
  }, [subjectSearch]);
  

  useEffect(() => {filterSubjects();}, [filterSubjects]);

  function handleSelectedCategorie(category){
    if (selectedCategorie === category){
      setSelectedCategorie("")
      /*setSortByCategory("")*/
    }else{
      setSelectedCategorie(category)
      /*setSortByCategory(category.courses[0].slice(0,2))*/
    }
    setSortBySubject("")
  }


  function handleSort(mappedData){
    if (sort === "rating"){
      setFilteredData(mappedData.sort((a, b) => (a.rating < b.rating) ? 1 : (a.rating === b.rating) ? ((a.date < b.date) ? 1 : -1) : -1 ))
    }
    if (sort === "grade"){
      setFilteredData(mappedData.sort((a, b) => (a.grade > b.grade) ? 1 : (a.grade === b.grade) ? ((a.rating > b.rating) ? 1 : -1) : -1 ))
    }
    if (sort === "date"){
      setFilteredData(mappedData.sort((a, b) => (a.date < b.date) ? 1 : (a.date === b.date) ? ((a.rating > b.rating) ? 1 : -1) : -1 ))
    }
  }


  function handleSortBySubject(subject){
    setSortBySubject(subject)
    setSubjectSearch(subject)
    setShow(false)
  }

  return (
    cookies.loggedIn ? 
      (cookies.uploads > 2 ? 
        (!selectedExam ? (
        <div className="browse-page3">
          <div className="course-search-bar">
            <input onClick={() => setShow(!show)} type="text" className="csb" placeholder="Vilken kurs letar du efter?" value={subjectSearch} onChange={(e)=>setSubjectSearch(e.target.value)}/>
            <div className={show ? "on-li" : "off-li"}>
              
              {filteredSubjects.map((subject) => (
                <li key={subject} onClick={() => handleSortBySubject(subject)}>{subject}</li>
              ))}
            </div>
            <div className="icon"><i className="fas fa-search"></i></div>
          </div>
          <div className="sidebar3">
            <div className="sidebar_container">
              <h1>Ämnen</h1>
                {categories.map((category) => (
                  <>
                    <button className="categoryButton"onClick={() => handleSelectedCategorie(category)}>{category.cat}</button><br />
                    <div className="courses">
                    {selectedCategorie == category && category.courses.map((course) => (
                    
                      <button className="courseButton"onClick={() => setSortBySubject(course)}>{course}</button>
                    ))}
                    </div>
                  </>
              ))}
            </div>
          </div>
            <div className="filter3">
              
              <h3>Filter</h3>
              <div className='filters'>
                
                <div className='browse-option'>
                  <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
                    <option value="">Datum</option>
                    {dates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                    ))}
                  </select>
                </div>
                <div className="browse-option">
                  <select value={sortByGrade} onChange={(e) => setSortByGrade(e.target.value)}>
                    <option value="">Betyg</option>
                    {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                  </select>
                </div>
              </div>
              <h3>Sortera</h3>
              <div className="filters">
                <div className="browse-option">
                
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <label>Sortera efter:</label>
                    <option value="rating">Omdömme</option>
                    <option value="grade">Betyg</option>
                    <option value="date">Datum</option>
                  </select>
                </div>
              </div>
          </div>
          <div className='exam_square'>
          {filteredData.map((file) => (
              <div onClick={() => setSelectedExam(file)} className="clickable-card">
                <Carditemsexam 
                    courseCode={file.subject}
                    date={file.date}
                    grade={file.grade}
                    /*rating={file.rating}*/
                    rating={file.rating}
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
              </div>
              <iframe className="exam-iframe" src={selectedExam.file_data}>
                Tentan
              </iframe>
              <div className='rating'>
              <Setstarrating
                rating={selectedExam.rating} 
                exam_id={selectedExam.id}
                />
              </div>
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

