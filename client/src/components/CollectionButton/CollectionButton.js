import React from "react";
import { Link } from "react-router-dom";

const CollectionButton = props => {
  return (
    <Link to="/collection">
      <button className="btn btn-primary">Back to Collection</button>
    </Link>
  );
};

export default CollectionButton;
