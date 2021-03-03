import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteDeck, readDeck, listCards } from "../../utils/api";
import ListCard from "./ListCard";

function DeckView() {
  const { deckId } = useParams();
  const [thisDeck, setThisDeck] = useState([]);
  const history = useHistory();
  const [listDeckCards, setListDeckCards] = useState([]);
  const handleDeleteDeck = () => {
    const abortController = new AbortController();
    if (
      window.confirm(
        `Do you really want to delete deck ${thisDeck.name}? There is no going back.`
      )
    ) {
      deleteDeck(deckId, abortController.signal);
      console.log("deleted deck");
      history.push("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchReadDeck(deckId) {
      try {
        const readDeckInfo = await readDeck(deckId, abortController.signal);
        setThisDeck(readDeckInfo);
      } catch (error) {
        history.push(`/error/${error}`);
      }
    }
    fetchReadDeck(deckId);
  }, []);
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeckCards(deckId) {
      try {
        const readCards = await listCards(deckId, abortController.signal);

        setListDeckCards(
          readCards.map((card) => <ListCard key={card.id} card={card} />)
        );
      } catch (error) {
        history.push(`/error/${error}`);
      }
    }
    fetchDeckCards(deckId);
  }, []);
  //   const listDeckCards = thisDeckCards.map((card) => (
  //     <ListCard key={card.id} card={card} />
  //   ));
  return (
    <div>
      <section className="card">
        <div className="card-header">
          <Link to="/">Home</Link> / {thisDeck.name}
        </div>
        <div className="card-body">
          <div className="card-title">
            <h1>{thisDeck.name}</h1>
          </div>
          <div className="card-text">
            <p>{thisDeck.description}</p>
            <div className="row container d-flex">
              <Link
                to={`/decks/${deckId}/edit`}
                type="button"
                className="btn btn-secondary m-1"
              >
                Edit
              </Link>
              <Link
                to={`/decks/${deckId}/study`}
                type="button"
                className="btn btn-primary m-1"
              >
                Study
              </Link>
              <Link
                to={`/decks/${deckId}/cards/new`}
                type="button"
                className="btn btn-success m-1"
              >
                + Add Card
              </Link>
              <button
                onClick={handleDeleteDeck}
                type="button"
                className="btn btn-danger m-1 ml-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>
      {listDeckCards.length ? (
        <section>
          <h1 className="text-center">Cards</h1>
          <div className="container">{listDeckCards}</div>
        </section>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DeckView;
