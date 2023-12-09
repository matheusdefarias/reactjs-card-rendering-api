import React from "react";
import "./Form.css";

export const Form = ({
  // title,
  // description,
  // imageUrl,
  // setTitle,
  // setDescription,
  // setImageUrl,
  cardInfo,
  setCardInfo,
  handleHttpRequest,
  loading,
}) => {
  
  const clearFields = () => {
    setCardInfo((prevInput) => ({
      title:'', description:'', imageUrl:''
    }))
    // setTitle("");
    // setDescription("");
    // setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleHttpRequest("POST", cardInfo);
    clearFields();
  };

  const handleEdit = async (e) => {
    handleHttpRequest("PUT", cardInfo);
    clearFields();
  };

  return (
    <div>
      <p>Adicionar card:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={cardInfo.title}
            name="title"
            onChange={(e) => {setCardInfo({...cardInfo, title: e.target.value})}}
            //onChange={(e) => setCardInfo(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={cardInfo.description}
            name="description"
            onChange={(e) => {setCardInfo({...cardInfo, description: e.target.value})}}
            //onChange={(e) => setCardInfo(e.target.value)}
          />
        </label>
        <label>
          URL da imagem:
          <input
            type="text"
            value={cardInfo.imageUrl}
            name="imageUrl"
            onChange={(e) => {setCardInfo({...cardInfo, imageUrl: e.target.value})}}
            //onChange={(e) => setCardInfo(e.target.value)}
          />
        </label>
        <input type="submit" value="Criar" />
        {loading && <p>Salvando...</p>}
        {!loading && <button onClick={() => handleEdit()}>Salvar</button>}
      </form>
    </div>
  );
};
