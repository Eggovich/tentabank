import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NoAccess from '../components/NoAccess';
import styles from './promote.module.css';

const Promote = () => {
    const [cookies, setCookie] = useCookies(["user"])
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("");
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5000/allusers", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                let users = data.response;
                setUsers(users);
            }
            )
    }, [update]);

    const handlePromote = (user_id, role) => {
        const formData = new FormData()
        formData.append("user_id", user_id)
        formData.append("role", role)
        try {
            fetch('http://localhost:5000/promote', {
                method: "POST",
                body: formData,
            })
            setUpdate(!update)
            window.location.reload(false)
        } catch (error) {
            console.error(error);
        }
    }

    const filteredUsers = users.filter(user => user.email.toLowerCase().startsWith(search.toLowerCase()))

    return (
        cookies.role === "Admin" ? (
            <div className={styles.container}>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Sök på epost..."
                    />
                </div>
                {["Student", "Reviewer", "University", "Admin"].map((role) => (
                    <div key={role} className={styles.roleContainer}>
                        <h2 className={styles.roleTitle}>{role}</h2>
                        {filteredUsers.filter(user => user.role === role).slice(0, 10).map((user) => (
                            <div key={user.user_id} className={styles.userContainer}>
                                <div className={styles.userInfo}>
                                    <p> <b>Namn:</b> {user.username}</p>
                                    <p> <b>Email:</b> {user.email}</p>
                                    <p> <b>Roll:</b> {user.role}</p>
                                </div>
                                <label>
                                    Ändra roll: 
                                <select 
                       
                                    value={user.role}
                                    onChange={(e) => handlePromote(user.user_id, e.target.value)}
                                >
                                    <option value="Student">Student</option>
                                    <option value="Reviewer">Reviewer</option>
                                    <option value="University">University</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                </label>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ) : (
            <NoAccess msg="Endast administratörer har tillgång hit" module={false} />
        )
    );
};

export default Promote;
