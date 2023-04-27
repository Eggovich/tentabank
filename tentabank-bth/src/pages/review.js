import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import NoAccess from '../components/NoAccess';
import styles from './review.module.css';
import InfoSection from '..//components/InfoSection';

const Review = () => {
  const [review, setReview] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [cookies] = useCookies(["User"])
  const [file, setFile] = useState("")
  const [status, setStatus] = useState("")
  const [checked, setChecked] = useState(false)
  const [comment, setComment] = useState("")
  const [startReview, setStartReview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/pending_files')
      .then((res) => res.json())
      .then((data) => {
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

  const handleReview = (file) => {
    setReview(true)
    setFile(file)
  }

  const handleSubmit = async (e) => {
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
        } else {
          setReview(false);
          setCurrentIndex(currentIndex + 1);
          if (currentIndex + 1 === filteredData.length) {
            setStartReview(false);
          } else {
            handleReview(filteredData[currentIndex + 1]);
          }
        }
      } catch (error) {
        console.error(error);
      }  
  };
  

  const startSequentialReview = () => {
    setStartReview(!startReview);
    handleReview(filteredData[currentIndex]);
  }

return (
  cookies.role === 'Reviewer' ? (
    !review ? (
      <div className={styles.landing_review}>
        <InfoSection />
        <div className={styles.center}>
          <button className={styles.start_review_button} onClick={startSequentialReview}>Start Sequential Review</button>
          <button className={styles.start_review_button} onClick={() => setStartReview(!startReview)}>Tryck här för att se hur många tentor som väntar granskning</button>
        </div>
        {startReview && (
            <>
              <table className={styles.exam_table}>
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
            </>
          )}
      </div>
    ) : (
      <div className={styles.container_review}>
      <div className={styles.review_content}>
        <div className={styles.review_pdf_container}>
          <iframe className={styles.pdf_review} src={file.file_data} />
        </div>
        <div className={styles.review_form_container}>
        <div className={styles.review_info}>
          <h1>Reviewing: <span className={styles.file_specific}>{file.file_name}</span></h1>
          <h2>Course code: <span className={styles.file_specific}>{file.subject}</span></h2>
          <h2>Date: <span className={styles.file_specific}>{file.exam_date}</span></h2>
          <h2>Anonymous code: <span className={styles.file_specific}>{file.exam_id}</span></h2>
          <h2>Grade: <span className={styles.file_specific}>{file.grade}</span></h2>
        </div>
          <form className={styles.review_form} onSubmit={handleSubmit}>
            <label htmlFor="comment">If the exam is not approved, provide a description of why it was not approved.</label>
            <input className={styles.review_input} type="text" id='comment' onChange={(e) => setComment(e.target.value)} placeholder="Comment" /><br />
            <label htmlFor="anon">Does the submitted file match the accompanying information?</label>
            <input className={styles.checkbox} type="checkbox" id='anon' checked={checked}
              onChange={() => setChecked(!checked)} /><br />
            <div className={styles.action_bar}>
              <button disabled={!comment} type="submit" className={styles.denied_button} onClick={() => setStatus("denied")}>Deny exam</button>
              <button disabled={!checked} type="submit" className={styles.accepted_button} onClick={() => setStatus("accepted")}>Approve exam</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
  ) : (
    <NoAccess msg="Only reviewers have access to this page" module={false} />
  )
);
};

export default Review;