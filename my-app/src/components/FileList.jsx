import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const loadFiles = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}`);
      setFiles(res.data);
    };
    loadFiles();
  }, []);

  return (
    <div>
      <h2>Your Files</h2>
      <Link to="/upload">Upload New File</Link>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <Link to={`/view/${file._id}`}>{file.filename}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
