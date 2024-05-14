import React from "react";
import { useParams } from "react-router-dom";

function TeamLeader() {
  const { username } = useParams();
  console.log(username);
  return (
    <div>
      <p>Welcome Team Leader {username}</p>
    </div>
  );
}

export default TeamLeader;
