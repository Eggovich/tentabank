import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import './profile.css';

const Profile = () => {
const [cookies, setCookie] = useCookies(['user']);
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
        console.log(data)
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
          grade: file.grade
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


return (
	!cookies.loggedIn? 
	(
	<div className="error-message">
		<h1>Logga in</h1>
	</div>
	) : (
	<div>
		<div className='profile-name'> Välkommen {cookies.username}!</div>
	    <p>role:{cookies.role}</p>
		{filteredData.map((file) => (
            <tr className="file-names" key={file.name}>
              <td>{file.file_name}</td>
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
	</div>

	)

);
};

export default Profile;
