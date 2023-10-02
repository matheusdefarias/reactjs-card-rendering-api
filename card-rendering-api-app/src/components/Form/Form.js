import React from "react";
import "./Form.css";

const Form = ({
  title,
  description,
  imageUrl,
  setTitle,
  setDescription,
  setImageUrl,
  handleHttpRequest,
  loading,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = {
      title,
      description,
      imageUrl,
    };

    handleHttpRequest("POST", card);

    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  const handleEdit = async (e) => {
    const card = {
      title,
      description,
      imageUrl,
    };

    handleHttpRequest("EDIT", card);

    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <div>
      <p>Adicionar card:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          URL da imagem:
          <input
            type="text"
            value={imageUrl}
            name="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <input type="submit" value="Criar" />
        {loading && <p>Aguarde...</p>}
        {!loading && <button onClick={() => handleEdit()}>Salvar</button>}
      </form>
    </div>
  );
};

export default Form;
