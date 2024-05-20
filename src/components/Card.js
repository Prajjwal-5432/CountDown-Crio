import React from "react";
import "./Card.css";
const Card = ({ number, type }) => {
  return (
    <div className="card">
      <p className="card-number">{number}</p>
      <p className="card-type">{type}</p>
    </div>
  );
};

export default Card;
