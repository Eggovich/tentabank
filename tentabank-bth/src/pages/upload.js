import React, { useState } from "react";
import { useCookies } from "react-cookie";


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
    cookies.loggedIn?(
    <div className="upload-form">
      { uploaded ? (
        <div className="upload-success">
          <h3>Din tenta ??r nu inl??mnad och v??ntar p?? att granskas</h3>
          <button onClick={handleUpload} className="submit-button">Ladda up igen</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".pdf" className="input-field" onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" className="input-field" onChange={(e) => setName(e.target.value)} placeholder="Ma1435" />
          <input type="text" className="input-field" onChange={(e) => setDate(e.target.value)} placeholder="2023-02-02"/>
          <input type="text" className="input-field" onChange={(e) => setExamId(e.target.value)} placeholder="Anonymitetskod"/>
          <select className="dropdown" onChange={(e) => setGrade(e.target.value)}>
            <option value="">Betyg</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
          <button type="submit" className="submit-button">Ladda upp</button>
        </form>
      )}
      {failedUpload === true && (<p className="errormessage">Fyll i alla f??lten</p>)}
      {failedName === true && (<p className="errormessage">Ogiltig kurskod</p>)}
      {failedDate === true && (<p className="errormessage">Ogiltigt Datum</p>)}
      {failedFile === true && (<p className="errormessage">Ogiltigt filformat</p>)}
      {failedServer === true && (<p className="errormessage">Ingen kontakt med servern, f??rs??k igen om en stund</p>)}
      {alreadyUploaded === true && (<p className="errormessage">Denna tenta ??r redan uppladdad</p>)}
    </div>
    ):(
      <div className="error-message">
        <h3>Du m??ste logga in f??r att kunna l??mna in tentor</h3>
      </div>
    )
  );
};
export default Upload;
