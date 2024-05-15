import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProgressBox from '../Tracking/ProgressBox';

function ProjectDetails() {
  const { projectName } = useParams();
  const [projects, setProjects] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (fileType) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/file-upload", formData);
      console.log(`File uploaded successfully for ${fileType}:`, response.data);
      // You can handle any post-upload logic here
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Find the project with the matching project name
  const project = projects.find(project => project.project_name === projectName);

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div>
      <h2>{project.project_name}</h2>
      <p>Amount: {project.amount}</p>
      <p>Academic Year: {project.Start_date}</p>
      <ProgressBox project={project} />

      <div>
        <h3>Upload Documents</h3>
        <label htmlFor="ppt">Upload PPT:</label>
        <input type="file" id="ppt" onChange={handleFileChange} /><br />
        <button onClick={() => handleFileUpload("ppt")}>Upload</button>
        <br />
        <label htmlFor="patent">Upload Patent:</label><br />
        <input type="file" id="patent" onChange={handleFileChange} /><br />
        <button onClick={() => handleFileUpload("patent")}>Upload</button>
        <br />
        <label htmlFor="researchPaper">Upload Research Paper:</label><br />
        <input type="file" id="researchPaper" onChange={handleFileChange} /><br />
        <button onClick={() => handleFileUpload("research paper")}>Upload</button>
      </div>
    </div>
  );
}

export default ProjectDetails;
