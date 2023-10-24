import React from "react";
import "./Card.css";

export const Card = ({
  id,
  title,
  description,
  imageUrl,
  handleHttpRequest,
  retrieveData,
}) => {
  return (
    <>
      <div className="card-container">
        <img src={imageUrl} alt="" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="button-edit" onClick={() => retrieveData(id)}>
          Editar
        </button>
        <button
          className="button-delete"
          onClick={() => handleHttpRequest("DELETE", id)}
        >
          Excluir
        </button>
      </div>
    </>
  );
};
