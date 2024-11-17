import React from "react";
import "./../styles/Card.css";

const Card = ({ card }) => {
  return (
    <div className="kanban-card">
      <h3>{card.code}</h3>
      <p>{card.description}</p>
    </div>
  );
};

export default Card;
