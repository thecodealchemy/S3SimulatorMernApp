import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FileViewer = () => {
  const { id } = useParams();
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    const getDownloadUrl = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/${id}`);
      setDownloadUrl(res.data.downloadUrl);
    };
    getDownloadUrl();
  }, [id]);

  return (
    <div>
      <h2>File Viewer</h2>
      {downloadUrl ? (
        <iframe src={downloadUrl} title="file" width="100%" height="600px" />
      ) : (
        <p>Loading file...</p>
      )}
    </div>
  );
};

export default FileViewer;
