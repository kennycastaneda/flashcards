import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <p>
        <Link to={`/`}>Return Home</Link>
      </p>
    </div>
  );
}

export default NotFound;
