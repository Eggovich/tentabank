import React, { useState, useEffect, useCallback } from 'react';
import {useCookies} from 'react-cookie'
import { NavLink } from 'react-router-dom';
import './review.css'

const Review = () => {
  const [review, setReview] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [cookies] = useCookies(["User"])
  const [file, setFile] = useState("")
  const [status, setStatus] = useState("")
  const [checked, setChecked] = useState(false)


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
        }else{
          setReview(false)
          window.location.reload(false);
        }
      } catch (error) {
        console.error(error);
      }  
    };
  
  
  return (
    cookies.role == "Reviewer" ? (
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
      <div className="review-box">
        <form className='review-form' onSubmit={handleSubmit}>
          <div className='item'>
            <select className="dropdown" onChange={(e) => setStatus(e.target.value)}>
              <option value="">Bedömning</option>
              <option value="Accepted">Accepted</option>
              <option value="Denied">Denied</option>
            </select>
          </div>
          <div className='item'>
            <label htmlFor="anon">
              <input type="checkbox" id='anon' checked={checked} onChange={setChecked(!checked)}/>Är tentan anonym?
            </label>
          </div>
          <button disabled={!checked || !status}type="submit" className="submit-button">Lämna in bedömning</button>
        </form>
      </div>
    )
  ):(
    <div>
      <p className='error-message'>Du måste vara inloggad som granskare för att ha åtkomst till sidan</p>
    </div>
  )
  );
  
};

export default Review;


