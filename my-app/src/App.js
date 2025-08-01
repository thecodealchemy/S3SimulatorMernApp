import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import FileViewer from './components/FileViewer';

function App() {
  return (
    <Router>
      <div className="container">
        <h1> Drive/Dropbox Clone</h1>
        <Routes>
          <Route path="/" element={<FileList />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/view/:id" element={<FileViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
