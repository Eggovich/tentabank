import React, { useState } from "react";
import { useCookies } from "react-cookie";
import styles from "./uploads.module.css"
import LoginForm from "../components/loginForm.js"


const Upload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState("");
  const [examId, setExamId] = useState("")
  const [uploaded, setUploaded] = useState(false);
  const [failedUpload, setFailedUpload] = useState(false);
  const [failedServer, setFailedServer] = useState(false);
  const [failedDate, setFailedDate] = useState(false);
  const [failedName, setFailedName] = useState(false)
  const [failedFile, setFailedFile] = useState(false)
  const [alreadyUploaded, setAlreadyUploaded] = useState(false)
  const [cookies, setCookies] = useCookies(["user"])


  const handleUpload = () =>{
    setUploaded(!uploaded)
  } 


  function reset(){
    setFailedName(false)
    setFailedServer(false)
    setFailedUpload(false)
    setFailedDate(false)
    setAlreadyUploaded(false)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    reset()
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("date", date);
    formData.append("grade", grade);
    formData.append("examId", examId);
    formData.append("user_id", cookies.user_id)

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.status === 400){
        setFailedUpload(true)
      }
      if (response.status === 401){
        setFailedFile(true)
      }
      if (response.status === 402){
        setFailedName(true)
      }
      if (response.status === 403){
        setFailedDate(true)
      }
      if (response.status === 404){
        setAlreadyUploaded(true)
      }
      if (!response.ok) {
        throw new Error("Upload failed");
      }else{
      handleUpload();
      }
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    
  <div className={styles.page_container}>
    <div className={styles.title}>Ladda upp</div>
    <div className={styles.info}>Hej</div>
    <div className={styles.form_half}>
    <div className={styles.form_container}>
    {cookies.loggedIn?(
      <>
      <h1>Ladda upp här!</h1>
      { uploaded ? (
        <div className={styles.upload_success}>
          <h3>Din tenta är nu inlämnad och väntar på att granskas</h3>
          <button onClick={handleUpload} className={styles.submit_button}>Ladda upp igen</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.upload_form}>
          <input type="file" accept=".pdf" className={styles.file_field} onChange={(e) => setFile(e.target.files[0])} />
          <div className={styles.form_element}>
            <label className={styles.labels}>Kurskod: </label>
            <input type="text" className={styles.input_field} onChange={(e) => setName(e.target.value)} placeholder="IY1234" />
          </div>
          <div className={styles.form_element}>
            <label className={styles.labels}>Datum: </label>
            <input type="text" className={styles.input_field} onChange={(e) => setDate(e.target.value)} placeholder="YYYY-MM-DD"/>
          </div>
          <div className={styles.form_element}>
            <label className={styles.labels}>Anonymitetskod: </label>
            <input type="text" className={styles.input_field} onChange={(e) => setExamId(e.target.value)} placeholder="ABCD-012"/>
          </div>
          <div className={styles.form_element}>
            <select className={styles.dropdown} onChange={(e) => setGrade(e.target.value)}>
              <option value="">Betyg</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div className={styles.form_element}>
            <button type="submit" className={styles.submit_button}>Ladda upp</button>
          </div>
        </form>
      )}
      {failedUpload === true && (<p className="errormessage">Fyll i alla fälten</p>)}
      {failedName === true && (<p className="errormessage">Ogiltig kurskod</p>)}
      {failedDate === true && (<p className="errormessage">Ogiltigt Datum</p>)}
      {failedFile === true && (<p className="errormessage">Ogiltigt filformat</p>)}
      {failedServer === true && (<p className="errormessage">Ingen kontakt med servern, försök igen om en stund</p>)}
      {alreadyUploaded === true && (<p className="errormessage">Denna tenta är redan uppladdad</p>)}
      </>
    ):(
      <div className={styles.not_logged_in}>
        <h4>Du måste logga in för att kunna lämna in tentor</h4>
        <LoginForm></LoginForm>
      </div>
      
    )
    }
    </div>
    </div>
  </div>
  );
};
export default Upload;
