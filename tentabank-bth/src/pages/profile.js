import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import './profile.css';
import img from "..//components/images/img-1.jpg"


const Profile = () => {
const [cookies, setCookie] = useCookies(['user']);
const [data, setData] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [filteredData, setFilteredData] = useState([[],[],[]]);
const [sortBySubject, setSortBySubject] = useState('');
const [sortByDate, setSortByDate] = useState('');
const [sortByGrade, setSortByGrade] = useState('');
const [subjects, setSubjects] = useState([]);
const [dates, setDates] = useState([]);
const [grades, setGrades] = useState([]);
const [status, setStatus] = useState([]);

const formData = new FormData();
formData.append("id", cookies.user_id);

useEffect(() => {
    fetch('http://localhost:5000/myfiles',
    {
      method: "POST",
      body: formData,
    })
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
        const acceptedfiles = data.accepted.map(file => ({
          ...file,
          subject: file.cource_code,
          date: file.exam_date,
          grade: file.grade,
          status: file.accepted
        }))
        const pendingfiles = data.pending.map(file => ({
            ...file,
            subject: file.cource_code,
            date: file.exam_date,
            grade: file.grade,
            status: file.accepted
        }))
        const deniedfiles = data.denied.map(file => ({
          ...file,
          subject: file.cource_code,
          date: file.exam_date,
          grade: file.grade,
          status: file.accepted
      }))
        setData([acceptedfiles, pendingfiles, deniedfiles]);
        setFilteredData([acceptedfiles, pendingfiles, deniedfiles]);
        console.log([acceptedfiles, pendingfiles, deniedfiles])
      });
  }, []);

  return (
    !cookies.loggedIn ? (
      <div className="error-message">
        <h1>Logga in</h1>
      </div>
    ) : (
      <div className="profile-page">
        <div className='profile-card'>
        
          <div className="container">
            <div className="profile-name"> Välkommen {cookies.username}!</div>
            <p>role:{cookies.role}</p>
          </div>
        
        </div>
  
        <div className="file-container accepted">
          <h2>Accepted files</h2>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Date</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData[0].map((file) => {
                if (file.status === "accepted") {
                  return (
                    <tr className="file-names" key={file.name}>
                      <td>{file.file_name}</td>
                      <td>{file.date}</td>
                      <td>{file.grade}</td>
                      <td>
                        <form action={file.link}>
                          <input type="submit" value="Download" />
                        </form>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
  
        <div className="file-container pending">
          <h2>Pending files</h2>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Date</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData[1].map((file) => {
                if (file.status === "pending") {
                  return (
                    <tr className="file-names" key={file.name}>
                      <td>{file.file_name}</td>
                      <td>{file.date}</td>
                      <td>{file.grade}</td>
                      <td>
                        <form action={file.link}>
                          <input type="submit" value="Download" />
                        </form>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
  
        <div className="file-container denied">
          <h2>Denied files</h2>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Date</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData[2].map((file) => {
                if (file.status === "denied") {
                  return (
                    <tr className="file-names" key={file.name}>
                      <td>{file.file_name}</td>
                      <td>{file.date}</td>
                      <td>{file.grade}</td>
                      <td>
                        <form action={file.link}>
                          <input type="submit" value="Download" />
                        </form>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
  
  
};

export default Profile;
