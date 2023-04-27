import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NoAccess from '../components/NoAccess';
import styles from './promote.module.css';

const Promote = () => {
    const [cookies, setCookie] = useCookies(["user"])
    const [users, setUsers] = useState([])
    const [update, setUpdate] = useState(false)
    useEffect( () => {
        fetch("http://localhost:5000/allusers", {
            method: "GET",
          })
          .then((res) => res.json())
          .then((data) => {
            setUsers(data.response)
            }
          )
      }, [update]
    );
    const handlePromote = (user_id) =>{
        const formData = new FormData()
        formData.append("user_id", user_id)
        try{
        fetch('http://localhost:5000/promote', {
            method: "POST",
            body: formData,
        })
        setUpdate(!update)
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
                <td><button onClick={() => handlePromote(user.user_id)}>Befodra till reviewer</button></td>
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
