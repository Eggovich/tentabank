import React, { useState } from "react";


const Upload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
	<p>Nu blev de tokigt</p>

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("date", date);
    formData.append("grade", grade);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
		<p>Nu blev de tokigt</p>
        throw new Error("Upload failed");
      }

      setUploaded(true);
    } catch (error) {
      console.error(error);
	  <p>Nu blev de tokigt</p>
    }
  };

  return (
    <div className="upload-form">
      { uploaded ? (
        <div className="upload-success">
          File uploaded successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="file" className="input-field" onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" className="input-field" onChange={(e) => setName(e.target.value)} placeholder="Ma1435" />
          <input type="text" className="input-field" onChange={(e) => setDate(e.target.value)} placeholder="2023-02-02"/>
          <select className="dropdown" onChange={(e) => setGrade(e.target.value)}>
            <option value="">Betyg</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
          <button type="submit" className="submit-button">Upload</button>
        </form>
      )}
    </div>
  );
};

export default Upload;
