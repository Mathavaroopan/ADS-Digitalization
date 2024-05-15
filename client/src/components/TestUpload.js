import React from "react";
import axios from 'axios';

export default function TestUpload({ fileType }) {
  const [file, setFile] = React.useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/file-upload",
        formData
      );
      console.log(`File uploaded successfully for ${fileType}:`, response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Upload {fileType.toUpperCase()}</h1>
      <input type="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}
