import Deck from "./Deck";
import React from "react";

function DeckList({ decks }) {
  const deckList = decks.map((deck) => <Deck key={deck.id} deck={deck} />); //
  return (
    <main className="container">
      <section className="row">{deckList}</section>
    </main>
  );
}

export default DeckList;

// setDeckList(
//   decksList.map((deck) => <Deck key={deck.id} deck={deck} />)
// );

/* <main className="container">
              <section className="row">{deckList}</section>
            </main> */
