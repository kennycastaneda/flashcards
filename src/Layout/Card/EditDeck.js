import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const initialFormState = {
    cards: [],
    name: "",
    description: "",
    id: null,
  };
  const [formData, setFormData] = useState(initialFormState);

  const history = useHistory();
  const abortController = new AbortController();
  const [thisDeck, setThisDeck] = useState([]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    async function fetchUpdateDeck() {
      try {
        updateDeck(formData, abortController.signal);
      } catch (error) {
        history.push(`/${error}`);
      }
    }
    fetchUpdateDeck(formData);
  };
  useEffect(() => {
    async function fetchDeckInfo(deckId) {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setThisDeck(deckInfo);
        setFormData({
          ...formData,
          id: deckInfo.id,
          name: deckInfo.name,
          description: deckInfo.description,
          cards: deckInfo.cards,
        });
      } catch (error) {
        history.push(`/${error}`);
      }
    }
    fetchDeckInfo(deckId);
  }, [deckId]);

  return (
    <section className="card">
      <div className="card-header">
        <Link to="/">Home</Link> /
        <Link to={`/decks/${deckId}`}> {thisDeck.name} </Link>/ Edit Deck
      </div>
      <div className="card-body">
        <div className="card-title">
          <h1>Edit Deck: {thisDeck.name}</h1>
        </div>
        <div className="card-text">
          <form onSubmit={handleSubmit} className="column">
            <label className="container-fluid">
              Name
              <br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-100"
                placeholder="Deck Name"
              />
            </label>
            <br />
            <label className="container-fluid">
              Description
              <br />
              <textarea
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-100"
                placeholder="Brief description of the deck"
              />
            </label>
            <br />
            <div className="container">
              <Link to={`/`} type="button" className="btn btn-secondary m-1">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary m-1">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditDeck;
