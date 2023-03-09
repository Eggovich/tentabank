import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [failedUpload, setFailedUpload] = useState(false);
  const [failedEmail, setFailedEmail] = useState(false);
  const [failedServer, setFailedServer] = useState(false);
  const [cookies, setCookies] = useCookies(["user"])



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: formData,
      });
      console.log(response)
      if (response.status === 400) {
        setFailedUpload(true);
      }
      if (response.status === 401) {
        setFailedEmail(true);
      }
      if (response.ok){
        setUploaded(true);
        }
    } catch (error) {
      setFailedServer(true);
      console.error(error);
    }
    
  };

  return (
    <div className="upload-form">
      { uploaded ? (
        <div className="upload-success">
          <p>Konto skapat!</p>
        </div>
      ) : (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" className="input-field" onChange={(e) => setName(e.target.value)} placeholder="Smeknamn" />
          <input type="text" className="input-field" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <input type="password" className="input-field" onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord"/>
          <button type="submit" className="submit-button">Skapa Konto</button>
        </form>
        <NavLink to="/login">Har du redan ett konto? Logga in här!</NavLink>
      </div>)}
      {failedUpload === true && (<p className="errormessage">Fyll i alla fälten</p>)}
      {failedEmail === true && (<p className="errormessage">Mejlen används redan i ett annat konto</p>)}
      {failedServer === true && (<p className="errormessage">Ingen kontakt med servern, försök igen om en stund</p>)}
      
    </div>
  );
};
export default Signup;
