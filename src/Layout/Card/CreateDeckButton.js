import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeckButton() {
  const history = useHistory();
  const handleCreateDeck = () => {
    history.push("/decks/new");
  };
  return (
    <div className="container-fluid text-right">
      <button
        onClick={handleCreateDeck}
        type="button"
        className="btn text-white btn-success p-4"
      >
        <h5 className="display-6">+ Add Deck</h5>
      </button>
    </div>
  );
}

export default CreateDeckButton;
