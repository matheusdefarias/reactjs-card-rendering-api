import { useState, useEffect } from "react";

import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const url = "http://localhost:3001/cards";

  const [cards, setCards] = useState([]);
  const [cardsState, setCardsState] = useState(null);

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

  console.log(cards);

  const handleDeleteCard = async (id) => {
    
    alert(id);

    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const deleteUrl = `${url}/${id}`;
    const res = await fetch(deleteUrl, config);
    const json = await res.json();

    setCardsState(json);

    console.log(json);
  };

  const handleEditCard = async () => {
    
    const data = {
      "title": "Life Stealer",
      "description": "Infests other units for mobility and strength",
      "imageUrl": "https://www.segurospromo.com.br/blog/wp-content/uploads/2017/05/turismo-na-suica-roteiro.jpg"
    } 
    
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

    console.log(json);
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
            handleEditCard={handleEditCard}
            handleDeleteCard={handleDeleteCard}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
