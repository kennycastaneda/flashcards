import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

function Study() {
  const { deckId } = useParams();
  const [thisDeck, setThisDeck] = useState([]);
  const history = useHistory();
  const [cardNumber, setCardNumber] = useState(0);
  const [flip, setFlip] = useState("front");

  const [numberOfCards, setNumberOfCards] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchReadDeck(deckId) {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setThisDeck(deckInfo);
        setNumberOfCards(deckInfo.cards.length);
      } catch (error) {
        console.log(numberOfCards);
        console.log(error);
        //history.push(`/${error}`);
      }
    }
    fetchReadDeck(deckId);
  }, []);

  const handleNext = () => {
    setCardNumber(cardNumber + 1);
    setFlip("front");
    if (cardNumber + 1 === numberOfCards) {
      if (window.confirm(`Restart Cards For ${thisDeck.name}?`)) {
        setCardNumber(0);
      } else {
        history.push("/");
      }
    }
  };

  const handleFlip = () => {
    if (flip === "front") {
      setFlip("back");
    } else {
      setFlip("front");
    }
  };

  if (thisDeck.id) {
    if (numberOfCards > 2) {
      return (
        <section className="card">
          <div className="card-header">
            <Link to="/">Home</Link> /
            <Link to={`/decks/${thisDeck.id}`}> {thisDeck.name}</Link> / Study
          </div>
          <div className="card-body">
            <h1 className="card-title">Study: {thisDeck.name}</h1>
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">
                  Card {cardNumber + 1} of {numberOfCards}
                </h1>
                <p className="card-text">{thisDeck.cards[cardNumber][flip]}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFlip}
              className="btn btn-secondary m-1"
            >
              Flip
            </button>
            {flip === "front" ? (
              <div></div>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-secondary m-1"
              >
                Next
              </button>
            )}
          </div>
        </section>
      );
    }
    return (
      <section className="card">
        <div className="card-header">
          <Link to="/">Home</Link> /
          <Link to={`/decks/${thisDeck.id}`}> {thisDeck.name}</Link> / Study
        </div>
        <div className="card-body">
          <h1 className="card-title">Study: {thisDeck.name}</h1>
          <div className="card-text">
            <h3>Not Enough Cards</h3>
            <p>
              You need at least 3 cards to study. There are {numberOfCards}{" "}
              cards in this deck.
            </p>
          </div>
          <Link
            type="button"
            to={`/decks/${thisDeck.id}/cards/new`}
            className="btn btn-primary"
          >
            + Add Card
          </Link>
        </div>
      </section>
    );
  }
  return <h1>Loading...</h1>;
}

export default Study;
