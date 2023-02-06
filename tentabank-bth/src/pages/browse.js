import React, { useState, useEffect, useCallback } from 'react';

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


  useEffect(() => {
    fetch('http://localhost:5000/files')
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.files.map(file => ({
          ...file,
          subject: file.name.split("/")[0],
          date: file.name.split("/")[1],
          grade: file.name.split("/")[2]
        }))
        setData(mappedData);
        setFilteredData(mappedData);
        let subjs = [...new Set(mappedData.map(file => file.subject))];
        setSubjects(subjs);
        let dats = [...new Set(mappedData.map(file => file.date))];
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
    updateDates(data)
    setFilteredData(data.filter(file => {
      if (searchTerm && !file.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (sortBySubject && file.subject !== sortBySubject) {
        return false;
      }
      if (sortByDate && file.date !== sortByDate) {
        return false;
      }
      if (sortByGrade && file.grade !== sortByGrade) {
        return false;
      }
      return true;
    }));
  }, [data, searchTerm, sortBySubject, sortByDate, sortByGrade]);

  useEffect(() => {
    filterFiles();
  }, [filterFiles]);

  function updateDates(data){
    let temp = [];
    for (let i = 0; i < data.length; i++){
      if (!temp.includes(data[i].date)){
        temp.push(data[i].date)
      }
    }
    setDates(temp)
    console.log(dates, temp)
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((file) => (
            <tr key={file.name}>
              <td>{file.name.split('/').pop()}</td>
              <td>{file.subject}</td>
              <td>{file.date}</td>
              <td>{file.grade}</td>
              <td>
              <form action={file.link}>
                <input type="submit" value="Download" />
              </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Browse;

