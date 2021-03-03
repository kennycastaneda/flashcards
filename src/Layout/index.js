import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckButton from "./Card/CreateDeckButton";
import DeckList from "./Card/DeckList";
import CreateDeck from "./Card/CreateDeck";
import DeckView from "./Card/DeckView";
import EditDeck from "./Card/EditDeck";
import { listDecks } from "../utils/api";
import Study from "./Card/Study";
import Card from "./Card/Card";
import { useHistory, Route, Switch } from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchListDecks() {
      try {
        const decksList = await listDecks(abortController.signal);

        if (decksList.length) {
          setDecks(decksList);
        }
      } catch (error) {
        history.push(`/${error}`);
      }
    }
    fetchListDecks();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />
            <DeckList decks={decks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <Card />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <Card />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
