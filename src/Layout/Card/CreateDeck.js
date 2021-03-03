import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(undefined);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    createDeck(formData, abortController.signal)
      .then(setFormData({ ...initialFormState }))
      .catch(setError);
  };

  return (
    <section className="card">
      <div className="card-header">
        <Link to="/">Home</Link> / Create Deck
      </div>
      <div className="card-body">
        <div className="card-title">
          <h1>Create Deck</h1>
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

export default CreateDeck;
