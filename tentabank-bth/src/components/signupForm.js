import { useNavigate, NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react"
import styles from "./signupForm.module.css"


const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [university, setUniversity] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const [failedUpload, setFailedUpload] = useState(false);
    const [response, setResponse] = useState("");
    const [failedServer, setFailedServer] = useState(false);

    function reset(){
        setFailedUpload(false)
        setFailedServer(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        reset()
        if (!name || !email || !password || !confirmPassword || !university){
            setFailedUpload(true);
            setResponse("Fyll i alla fälten");
            return
        }
        if (password != confirmPassword){
            setFailedUpload(true);
            setResponse("Lösenorden stämmer ej överens");
            return
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("university", university);

        try {
        const data = await fetch("http://localhost:5000/signup", {
            method: "POST",
            body: formData,
        });
        if (data.status === 401) {
            setFailedUpload(true);
            setResponse("Denna email används redan");
        }
        if (data.ok){
            setUploaded(true);
        }
        } catch (error) {
        setFailedServer(true);
        console.error(error);
        }
    
    };


    return (
        
        <div className={styles.login_container}>
            <h2 className={styles.login_title}>Skapa konto</h2>
            {!uploaded ? (
            <form className={styles.login_form} onSubmit={handleSubmit}>
                <input type="text" className={styles.login_input} onChange={(e) => setName(e.target.value)} placeholder="Smeknamn" />
                <input type="text" className={styles.login_input} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <input type="password" className={styles.login_input} onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord"/>
                <input type="password" className={styles.login_input} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Konfirmera lösenordet"/>
                <select className={styles.login_input} onChange={(e) => setUniversity(e.target.value)}>
                    <option value="">Universitet</option>
                    <option value="BTH">BTH</option>
                </select>
                <button type='submit' className={styles.login_submit}>
                    Skapa konto
                </button>
            </form>
            ):
            (<p>Kontot är nu skapat!</p>)
            }
            {failedUpload && (<p className="errormessage">{response}</p>)}
            {failedServer && (<p className="errormessage">Ingen kontakt med servern, försök igen om en stund</p>)}
        </div>
    )
}

export default SignupForm