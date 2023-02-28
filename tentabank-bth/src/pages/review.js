import React, { useState, useEffect, useCallback } from 'react';
import {useCookies} from 'react-cookie'
import { NavLink } from 'react-router-dom';

const Review = () => {
  const [data, setData] = useState([]);
  const [review, setReview] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [cookies] = useCookies(["User"])
  const [file, setFile] = useState("")
  const [status, setStatus] = useState("")


  useEffect(() => {
    fetch('http://localhost:5000/pending_files')
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
          id: file.id
        }))
        setData(mappedData);
        setFilteredData(mappedData);
      });
  }, []);
  const handleReview = (file) =>{
    setReview(true)
    setFile(file)
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", file.id)
    formData.append("status", status)
    try {
        const response = await fetch("http://localhost:5000/reviewed", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error(error);
      }  
    };
  return (
    !review ? (
    <div>
      <div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Grade</th>
            <th>Actions</th>
            <th>Review-form</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((file) => (
            <tr key={file.name}>
              <td>{file.file_name}</td>
              <td>{file.subject}</td>
              <td>{file.date}</td>
              <td>{file.grade}</td>
              <td><a href={file.file_data}>Download</a></td>
              <td><button onClick={() => handleReview(file)}>Review</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    ) : (
    <div>
        <form onSubmit={handleSubmit}>
          <select className="dropdown" onChange={(e) => setStatus(e.target.value)}>
            <option value="">Bedömning</option>
            <option value="Accepted">Accepted</option>
            <option value="Denied">Denied</option>
          </select>
          <button type="submit" className="submit-button">Ladda up</button>
        </form>
    </div>
    )
  );
};

export default Review;


