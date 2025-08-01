import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const handleChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await axios.post(`${process.env.REACT_APP_API_BASE}/upload`, formData);
    // after upload is complete,alert and redirects are handled here
    alert("File uploaded!");
    setFile(null); 
    window.location.href = "/"; 
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
