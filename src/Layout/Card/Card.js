import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck, updateCard, readCard } from "../../utils/api";

function Card() {
  const { deckId, cardId } = useParams();

  const [thisDeck, setThisDeck] = useState([]);
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: "",
    deckId: deckId,
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      if (cardId) {
        await updateCard(formData, abortController.signal);
      } else {
        await createCard(deckId, formData, abortController.signal);
        setFormData(initialFormState);
      }
    } catch (error) {
      history.push(`/${error}`);
    }
  };
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleAddAnother = () => {
    setFormData(initialFormState);
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeckInfo(deckId) {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setThisDeck(deckInfo);
      } catch (error) {
        history.push(`/error/${error}`);
      }
    }
    fetchDeckInfo(deckId);
  }, [deckId]);
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchCardInfo(cardId) {
      try {
        const card = await readCard(cardId, abortController.signal);

        setFormData({
          ...formData,
          id: card.id,
          front: card.front,
          back: card.back,
        });
      } catch (error) {
        history.push(`/${error}`);
      }
    }
    if (cardId) {
      fetchCardInfo(cardId);
    }
  }, [cardId]);
  const cardTitle = !cardId ? "Add Card" : `Edit Card ${cardId}`;
  const buttonDone = !cardId ? "Done" : "Cancel";
  const buttonSave = !cardId ? "Save" : "Submit";
  return (
    <section className="card">
      <div className="card-header">
        <Link to="/">Home</Link> /
        <Link to={`/decks/${deckId}`}> {thisDeck.name} </Link>
        {" / "}
        {cardTitle}
      </div>
      <div className="card-body">
        <div>
          <h1 className="card-title">{cardTitle}</h1>
        </div>
        <form onSubmit={handleSubmit} className="column">
          <label className="container-fluid">
            Front
            <br />
            <textarea
              type="text"
              id="front"
              name="front"
              value={formData.front}
              onChange={handleChange}
              className="w-100"
              placeholder="Front side of card"
            />
          </label>
          <br />
          <label className="container-fluid">
            Back
            <br />
            <textarea
              type="text"
              id="back"
              name="back"
              value={formData.back}
              onChange={handleChange}
              className="w-100"
              placeholder="Back side of card"
            />
          </label>
          <br />
          <div className="container">
            <Link
              to={`/decks/${deckId}`}
              type="button"
              className="btn btn-secondary m-1"
            >
              {buttonDone}
            </Link>
            <button type="submit" className="btn btn-primary m-1">
              {buttonSave}
            </button>
            {cardId && (
              <Link
                to={`/decks/${deckId}/cards/new`}
                className="btn btn-success m-1"
                type="button"
                onClick={handleAddAnother}
              >
                Add Another
              </Link>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
export default Card;
