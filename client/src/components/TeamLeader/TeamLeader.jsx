import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TeamLeader() {
  const { username } = useParams();
  console.log(username);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");
        setProjects(response.data);
        console.log(response.data);
        console.log("Fetched");
      } catch (error) {
        console.log("Error fetching projects", error);
        setError("Error fetching projects");
      } finally {
        setLoading(false);
      }
    };
    console.log("useEffect executed");
    fetchProjects();
  }, []); // Empty dependency array, runs only once

  console.log("Projects???");
  console.log(projects);

  let project = null;
  for (let p of projects) {
    console.log(p.team_leader);
    console.log(username);
    if (p.team_leader === username) {
      project = p;
      break;
    }
  }
  console.log(project);

  if (project) {
    navigate(`/project-details/${project.project_name}`);
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default TeamLeader;
