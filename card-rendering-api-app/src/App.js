import { useState, useEffect } from "react";

import "./App.css";
import { Card } from "./components/Card";
import { Form } from "./components/Form";

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
  };

  const handleHttpRequest = async (method, data) => {
    const config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method === "DELETE") {
      const deleteUrl = `${url}/${data}`;
      const res = await fetch(deleteUrl, config);
      const json = await res.json();

      setCardsState(json);
      return;
    }

    if (method === "POST") {
      config.body = JSON.stringify(data);

      let fetchOptions = [url, config];
      const res = await fetch(...fetchOptions);
      const json = await res.json();

      setCardsState(json);
      return;
    }

    //method === "PUT"
    setLoading(true);
    const putUrl = `${url}/${idUpdate}`;

    config.body = JSON.stringify(data);

    const res = await fetch(putUrl, config);
    const json = await res.json();

    setCardsState(json);
    setLoading(false);
  };

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
