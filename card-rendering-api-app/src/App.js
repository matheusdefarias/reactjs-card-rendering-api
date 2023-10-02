import { useState, useEffect, useRef } from "react";

import "./App.css";
import Card from "./components/Card/Card";
import Form from "./components/Form/Form";

function App() {
  const url = "http://localhost:3001/cards";

  const [cards, setCards] = useState([]);
  const [cardsState, setCardsState] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [idUpdate, setIdUpdate] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const responseJson = await response.json();

      // await fetch(url)
      //   .then((data) => {
      //     return data.json();
      //   })
      //   .then((responseJson) => {
      //     setCards(responseJson);
      //   });

      // console.log(responseJson);

      setCards(responseJson);
    }

    fetchData();
  }, [cardsState]);

  const retrieveData = async (id) => {
    const putUrl = `${url}/${id}`;
    const response = await fetch(putUrl);
    const responseJson = await response.json();

    setTitle(responseJson.title);
    setDescription(responseJson.description);
    setImageUrl(responseJson.imageUrl);
    setIdUpdate(id);

    console.log(responseJson);
  };

  const handleHttpRequest = async (method, data) => {
    if (method === "DELETE") {
      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const deleteUrl = `${url}/${data}`;
      const res = await fetch(deleteUrl, config);
      const json = await res.json();

      setCardsState(json);
    } else if (method === "POST") {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      let fetchOptions = [url, config];
      const res = await fetch(...fetchOptions);
      const json = await res.json();

      setCardsState(json);
    } else if (method === "EDIT") {
      setLoading(true);
      const putUrl = `${url}/${idUpdate}`;
      console.log(data);
      console.log(putUrl);
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const res = await fetch(putUrl, config);
      const json = await res.json();

      setCardsState(json);
      setLoading(false);
    }
  };

  console.log(cards);

  return (
    <div>
      <h1>Card Rendering API App</h1>
      <div className="App">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            handleHttpRequest={handleHttpRequest}
            retrieveData={retrieveData}
          />
        ))}
      </div>
      <Form
        title={title}
        description={description}
        imageUrl={imageUrl}
        setTitle={setTitle}
        setDescription={setDescription}
        setImageUrl={setImageUrl}
        handleHttpRequest={handleHttpRequest}
        loading={loading}
      />
    </div>
  );
}

export default App;
