import styles from "../pages/uploads.module.css"
import {useState} from "react"
import {useCookies} from "react-cookie"

const MassUpload = () => {
    const [folder, setFolder] = useState([]);
    const [cookies, setCookies] = useCookies(["user"])
    const handleSubmit = (e) => {
        e.preventDefault();
        const chosenFiles = Array.prototype.slice.call(folder)
        handleUpload(chosenFiles) 
    };

    const handleUpload = async (files) => {
        console.log(files)
        const formData = new FormData();
        files.forEach((file, i) => {
            formData.append(`file-${i}`, file, file.name);
          });
        formData.append("user_id", cookies.user_id)
        formData.append("university", cookies.university)
        formData.append("length", files.length)
        for (var [key, value] of formData.entries()) { 
            console.log(key, value);
           }
        try {
          const response = await fetch("http://localhost:5000/mass_upload", {
            method: "POST",
            body: formData,
          });
          console.log(response)
        } catch (error) {
          console.error(error);
        }
        
    }

    return (
    <>
    <form onSubmit={handleSubmit}>
    <label htmlFor="fileUpload"> 
        <div className={styles.file_square}>
          <i className="fa fa-upload"></i>
          <p className={styles.upload_text}>Klicka för att välja mapp att ladda upp</p>
          <input id="fileUpload" type="file" accept="application/pdf" name="file"
          className={styles.file_field} multiple webkitdirectory="true" directory="true"
          onChange={(e) => setFolder(e.target.files)} style={{ display: 'none' }} />
        </div>
    </label>
    <button type="Submit">Ladda upp mappen</button>
    </form>
    </>
    )
}

export default MassUpload