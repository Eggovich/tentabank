import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NoAccess from '../components/NoAccess';
import styles from './promote.module.css';

const Promote = () => {
    const [cookies, setCookie] = useCookies(["user"])
    const [users, setUsers] = useState([])
    const [reviewers, setReviewers] = useState([])
    const [admins, setAdmins] = useState([])
    const [update, setUpdate] = useState(false)
    useEffect( () => {
        fetch("http://localhost:5000/allusers", {
            method: "GET",
          })
          .then((res) => res.json())
          .then((data) => {
            let students = data.response.filter(user => user.role == "Student")
            let reviewers = data.response.filter(user => user.role == "Reviewer")
            let admins = data.response.filter(user => user.role == "Admin")
            setUsers(students)
            setReviewers(reviewers)
            setAdmins(admins)
            }
          )
      }, [update]
    );
    const handlePromote = (user_id, role) =>{
        const formData = new FormData()
        formData.append("user_id", user_id)
        formData.append("role", role)
        try{
        fetch('http://localhost:5000/promote', {
            method: "POST",
            body: formData,
        })
        setUpdate(!update)
        window.location.reload(false)
        }catch (error){
            console.error(error);
        }
        
    }
    return (
    cookies.role === "Admin" ? (
    <div className={styles.backdrop}>
        <table>
        <thead>
            <tr>
                <th>Användarnamn</th>
                <th>Mail</th>
                <th>Roll</th>
                <th>Befodra</th>
            </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td><button onClick={() => handlePromote(user.user_id, "Reviewer")}>Befodra till reviewer</button></td>
            </tr>
            ))}
        </tbody>
        </table>
        <table>
        <thead>
            <tr>
                <th>Användarnamn</th>
                <th>Mail</th>
                <th>Roll</th>
                <th>Befodra</th>
            </tr>
        </thead>
        <tbody>
        {reviewers.map((user) => (
            <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td><button onClick={() => handlePromote(user.user_id, "Admin")}>Befodra till Admin</button></td>
            </tr>
            ))}
        </tbody>
        </table>
        <table>
        <thead>
            <tr>
                <th>Användarnamn</th>
                <th>Mail</th>
                <th>Roll</th>
            </tr>
        </thead>
        <tbody>
        {admins.map((user) => (
            <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    ):(
    <NoAccess msg="Endast administratörer har tillgång hit" module={false}/>
    )
  );
};

export default Promote;
