import React from "react";
import { Link } from "react-router-dom";

const SingleButton = props => {
  return (
    <Link to={`/collection/${props._id}`}>
      <button className="btn btn-primary">View single car</button>
    </Link>
  );
};

export default SingleButton;
