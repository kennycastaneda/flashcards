import React from "react";

function CreateDeckButton({ handleCreateDeck }) {
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
