import axios from 'axios';
import React, { useRef, useState } from 'react';
import '../admin/admin.css';

function AdminPage() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Browse Files .csv/excel');

  const handleIconClick = () => {
    fileInputRef.current.click();
    console.log('icon clicked');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      console.log('file changed');
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${'http://localhost:4000'}/uploads`, formData);
      console.log(response.data.message); // Directly log response
      alert('Uploaded Successfully');
    } catch (error) {
      console.log(error);
      alert('Error uploading file');
    }
  };

  return (
    <div className='admin'>
      <div>
      <p className='msg'>Welcome To <br/> Admin <br/>Dashboard</p>

      </div>
  


      <div className="upload">
      <input type="file" style={{ display: 'none' }}  ref={fileInputRef} onChange={handleFileChange} />
      <i className='bx bx-cloud-upload' onClick={handleIconClick}></i>
      <p>{fileName}</p>
      </div>
      <div className="upload-btn" onClick={handleUpload}>
        <p>Upload</p>
      </div>

    </div>
  )
}

export default AdminPage