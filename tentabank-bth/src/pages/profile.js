import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import './profile.css';
import img from "..//components/images/img-1.jpg"
import {confirmAlert} from "react-confirm-alert"
import 'react-confirm-alert/src/react-confirm-alert.css'


const Profile = () => {
const [cookies, setCookie, removeCookie] = useCookies(['user']);
const [filteredData, setFilteredData] = useState([[],[],[]]);

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
          status: file.accepted,
          id: file.id,
          link: file.file_data
        }))
        const pendingfiles = data.pending.map(file => ({
            ...file,
            subject: file.cource_code,
            date: file.exam_date,
            grade: file.grade,
            status: file.accepted,
            id: file.id,
            link: file.file_data
        }))
        const deniedfiles = data.denied.map(file => ({
          ...file,
          subject: file.cource_code,
          date: file.exam_date,
          grade: file.grade,
          status: file.accepted,
          id: file.id,
          link: file.file_data
      }))
        setFilteredData([acceptedfiles, pendingfiles, deniedfiles]);
        setCookie("uploads", acceptedfiles.length, {path: '/'})
      });
  }, []);


const handleErase = (id, status, uploads) =>{
    setCookie("uploads", uploads - 1, {path: '/'})
    const formData = new FormData();
    formData.append("id", id)
    formData.append("status", status)
    fetch('http://localhost:5000/erase',
    {
      method: "POST",
      body: formData,
    })
    window.location.reload(false)
  }


const handleDeleteAccount = (user_id) =>{
  const formData = new FormData();
  formData.append("user_id", user_id)
  fetch('http://localhost:5000/deleteAccount',
    {
      method: "POST",
      body: formData,
    })
  removeCookie("user")
  removeCookie("username")
  removeCookie("email")
  removeCookie("password")
  removeCookie("role")
  removeCookie("user_id")
  removeCookie("loggedIn")
  removeCookie("uploads")
  window.location.reload(false)
}


const submit = (infolist) => {
  var options;
  if (infolist.length == 3){
    options = {
      title: 'Bekräftelse av radering',
      message: 'Är du säker på att du vill radera tentan?',
      buttons: [
        {
          label: 'Ja',
          onClick: () => handleErase(infolist[0], infolist[1], infolist[2])
        },
        {
          label: 'Nej'
        }
      ]
    }
  }else{
    options = {
      title: 'Bekräftelse av konto-radering',
      message: 'Är du säker på att du vill radera ditt konto?',
      buttons: [
        {
          label: 'Ja',
          onClick: () => handleDeleteAccount(infolist[0])
        },
        {
          label: 'Nej'
        }
      ]
    }
  } 
    confirmAlert(options);
  };

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
          <h2>Accepterade tentor</h2>
          <table>
            <thead>
              <tr>
                <th>Filnamn</th>
                <th>Datum</th>
                <th>Betyg</th>
                <th>Ladda ner</th>
                <th>Radera</th>
              </tr>
            </thead>
            <tbody>
              {filteredData[0].map((file) => {
                return (
                  <tr className="file-names" key={file.id+file.file_name+file.date+file.grade}>
                    <td key={file.id + file.file_name}>{file.file_name}</td>
                    <td key={file.id + file.date}>{file.date}</td>
                    <td key={file.id + file.grade}>{file.grade}</td>
                    <td key={file.id + file.link}>
                      <form action={file.link}>
                        <input type="submit" value="Download" />
                      </form>
                    </td>
                    <td key={file.id}>
                      <button onClick={() => submit([file.id, "accepted", cookies.uploads])}>Radera</button>
                    </td>
                  </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
  
        <div className="file-container pending">
          <h2>Väntar på gransking</h2>
          <table>
            <thead>
              <tr>
                <th>Filnamn</th>
                <th>Datum</th>
                <th>Betyg</th>
                <th>Ladda ner</th>
                <th>Radera</th>
              </tr>
            </thead>
            <tbody>
              {filteredData[1].map((file) => {
                  return (
                    <tr className="file-names" key={file.id+file.file_name+file.date+file.grade}>
                      <td key={file.id + file.file_name}>{file.file_name}</td>
                      <td key={file.id + file.date}>{file.date}</td>
                      <td key={file.id + file.grade}>{file.grade}</td>
                      <td key={file.id + file.link}>
                        <form action={file.link}>
                          <input type="submit" value="Download" />
                        </form>
                      </td>
                      <td key={file.id}>
                        <button onClick={() => submit([file.id, "pending", cookies.upload])}>Radera</button>
                      </td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>
  
        <div className="file-container denied">
          <h2>Nekade tentor</h2>
          <table>
            <thead>
              <tr>
                <th>Filnamn</th>
                <th>Datum</th>
                <th>Betyg</th>
                <th>Ladda ner</th>
                <th>Radera</th>
              </tr>
            </thead>
            <tbody>
              {filteredData[2].map((file) => {
                  return (
                    <tr className="file-names" key={file.id+file.file_name+file.date+file.grade}>
                  <td key={file.id + file.file_name}>{file.file_name}</td>
                  <td key={file.id + file.date}>{file.date}</td>
                  <td key={file.id + file.grade}>{file.grade}</td>
                  <td key={file.id + file.link}>
                    <form action={file.link}>
                      <input type="submit" value="Download" />
                    </form>
                  </td>
                  <td key={file.id}>
                    <button onClick={() => submit([file.id, "denied", cookies.uploads])}>Radera</button>
                  </td>
                </tr>
                  );
              })}
            </tbody>
          </table>

        </div>
        <div className='blank'>
          
        </div>
        <button className='delete-account' onClick={() => submit([cookies.user_id])}>
            Radera konto
        </button>
      </div>
    )
  );
  
  
};

export default Profile;
