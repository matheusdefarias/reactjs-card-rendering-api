import React from "react";
import "./Card.css";

const Card = ({ id, title, description, imageUrl, handleEditCard, handleDeleteCard }) => {
  return (
    <>
      <div className="card-container">
        <img src={imageUrl} alt="" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="button-edit" onClick={() => handleEditCard()}>Editar</button>
        <button className="button-delete" onClick={() => handleDeleteCard(id)}>Excluir</button>
      </div>
    </>
  );
};

export default Card;
