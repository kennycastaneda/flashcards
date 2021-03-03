import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function Deck({ deck }) {
  const history = useHistory();

  const handleDeleteDeck = () => {
    const abortController = new AbortController();
    if (
      window.confirm(
        `Do you really want to delete deck ${deck.name}? There is no going back.`
      )
    ) {
      deleteDeck(deck.id, abortController.signal);
      console.log("deleted deck");
      history.push("/");
      window.location.reload();
    }
  };

  if (deck) {
    return (
      <article className="card container-fluid m-1">
        <div className="card-body">
          <h1 className="card-title">{deck.name}</h1>
          <p className="card-text">{deck.description}</p>
          <Link
            to={`/decks/${deck.id}`}
            type="button"
            className="btn btn-secondary m-1"
          >
            View
          </Link>
          <Link
            to={`/decks/${deck.id}/study`}
            type="button"
            className="btn btn-primary m-1"
          >
            Study
          </Link>
          <button
            onClick={handleDeleteDeck}
            type="button"
            className="btn btn-danger m-1"
          >
            Delete
          </button>
        </div>
        <div className="card-footer">{deck.cards.length} cards</div>
      </article>
    );
  }
  return <p>Loading...</p>;
}

export default Deck;
