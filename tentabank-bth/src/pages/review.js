import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import NoAccess from '../components/NoAccess';
import styles from './review.module.css';

const Review = () => {
  const [review, setReview] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [cookies] = useCookies(["User"])
  const [file, setFile] = useState("")
  const [status, setStatus] = useState("")
  const [checked, setChecked] = useState(false)
  const [comment, setComment] = useState("")


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
          exam_id: file.exam_id,
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
    if (status === "denied"){
      formData.append("comment", comment)
      formData.append("user_id", cookies.user_id)
    }
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
    cookies.role === "Reviewer" ? (
    !review ? (
    <div className={styles.container_review}>
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
        <div className={styles.container_review}>
          <div className={styles.third_left}>
            <form className={styles.reviewform} onSubmit={handleSubmit}>
              <p>Granskning av {file.file_name}</p>
              <label htmlFor="comment">Om tentan inte godkänns, ge en beskrivning om varför den inte blev det.</label>
              <input className={styles.review} type="text" id='comment' onChange={(e) => setComment(e.target.value)} placeholder="Kommentar"/><br/>
              <label htmlFor="anon">Stämmer den inlämnade filen med medföljande uppgifter?</label>
              <input className={styles.checkbox} type="checkbox" id='anon' checked={checked} onChange={() => setChecked(!checked)}/><br/>
              <div className={styles.buttons}>
                <button disabled={!comment} type="submit" className={styles.denied_button} onClick={() => setStatus("denied")}>Neka tentan</button>
                <button disabled={!checked} type="submit" className={styles.accepted_button} onClick={() => setStatus("accepted")}>Godkänn tentan</button>
              </div>
            </form>
          </div>
          <div className={styles.third_mid}>
            <iframe className={styles.pdf_review} src={file.file_data}/>
          </div>
          <div className={styles.third_right}>
            <div className={styles.reviewform}>
              <h1>Den givna infon om uppladdningen</h1>
              <h3>Kurskod: {file.subject}</h3>
              <h3>Datum: {file.exam_date}</h3>
              <h3>Anonymitetskod: {file.exam_id}</h3>
              <h3>Betyg: {file.grade}</h3>
            </div>
          </div>
        </div>
    )
  ):(
    <NoAccess msg="Endast granskare har tillgång till denna sidan" module={false}/>
  )
  );
  
};

export default Review;


