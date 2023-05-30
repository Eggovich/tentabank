import styles from "../pages/uploads.module.css"
import styles2 from "./MassUpload.module.css"
import {useState} from "react"
import {useCookies} from "react-cookie"

const MassUpload = () => {
    const [folder, setFolder] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const [success, setSuccess] = useState(0);
    const [failed, setFailed] = useState(0);
    const [cookies, setCookies] = useCookies(["user"])
    const handleSubmit = (e) => {
        e.preventDefault();
        const chosenFiles = Array.prototype.slice.call(folder)
        handleUpload(chosenFiles) 
    };

    const handleUpload = async (files) => {
        const formData = new FormData();
        files.forEach((file, i) => {
            formData.append(`file-${i}`, file, file.name);
          });
        formData.append("user_id", cookies.user_id)
        formData.append("university", cookies.university)
        formData.append("length", files.length)
        try {
          await fetch("http://localhost:5000/mass_upload", {
            method: "POST",
            body: formData,
          });
          setUploaded(true)
        } catch (error) {
          console.error(error);
        }
        
    }

    return (
    !uploaded ? (
    <form className={styles2.form} onSubmit={handleSubmit}>
    <label htmlFor="fileUpload"> 
        <div className={styles.file_square}>
          <i className="fa fa-upload"></i>
          {folder.length === 0 ? (<p className={styles.upload_text}>Klicka för att välja fil</p>):(<p className={styles.upload_text}>{folder.length} filer valda</p>)}
          <input id="fileUpload" type="file" accept="application/pdf" name="file"
          className={styles.file_field} multiple webkitdirectory="true" directory="true"
          onChange={(e) => setFolder(e.target.files)} style={{ display: 'none' }} />
        </div>
    </label>
    <button className={styles2.submit} type="Submit">Ladda upp mappen</button>
    </form>
    ):(
    <div className={styles2.form}>
        <p>Uppladdningen lyckades!</p>
        <button className={styles2.submit} onClick={() => setUploaded(false)}>Ladda upp igen</button>
    </div>
    )
    )
}

export default MassUpload