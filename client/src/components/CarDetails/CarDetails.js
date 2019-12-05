import React from "react";

const CarDetails = props => {
  return (
    <div className="row" style={{ paddingBottom: "5em" }}>
      <div className="col-sm-2" />
      <div className="col-sm-4">
        <img
          src={props.imageURL}
          className="single-car-image"
          alt={`Tesla Model ${props.model} in ${props.color}`}
        />
      </div>
      <div className="col-sm-6">
        <h1>Tesla Model {props.model}</h1>
        <ul>
          <li>Color: {props.color}</li>
          <li>Year: {props.year}</li>
          <li>ID: {props._id}</li>
          {props.accident && (
            <>
              <li>Accident:</li>
              <li>Repaired ? {JSON.stringify(props.accident.repaired)}</li>
              <li>Cost: {props.accident.cost}</li>
            </>
          )}
        </ul>
        {props.button}
        {props.deleteButton && (
          <button
            className="btn btn-danger"
            onClick={() => {
              props.deleteCarById(props._id);
            }}
          >
            Delete!
          </button>
        )}
      </div>
      <div className="col-sm-2" />
    </div>
  );
};

export default CarDetails;
