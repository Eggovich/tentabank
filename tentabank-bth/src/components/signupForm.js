import { useNavigate, NavLink } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react"
import "./signupForm.css"


const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        if (!name || !email || !password){
            setFailedUpload(true);
            setResponse("Fyll i alla fälten");
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

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
        
        <div className='login-container'>
            <h2 className='login-title'>Skapa konto</h2>
            {!uploaded ? (
            <form className='login-form' onSubmit={handleSubmit}>
                <input type="text" className="login-input" onChange={(e) => setName(e.target.value)} placeholder="Smeknamn" />
                <input type="text" className="login-input" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <input type="password" className="login-input" onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord"/>
                <button type='submit' className='login-submit'>
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