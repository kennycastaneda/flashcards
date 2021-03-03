import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api/index";

function ListCard({ card }) {
  const { url } = useRouteMatch();
  const handleDeleteCard = () => {
    const abortController = new AbortController();
    if (
      window.confirm(
        `Do you really want to delete card ${card.id}? There is no going back.`
      )
    ) {
      try {
        deleteCard(card.id, abortController.signal);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container border-secondary border rounded my-1 p-1">
      <div className="row container mx-auto">
        <div className="col border border-secondary m-1 rounded">
          {card.front}
        </div>
        <div className="col border border-secondary m-1 rounded">
          {card.back}
        </div>
      </div>
      <div className="row container mx-auto">
        <Link
          to={`${url}/cards/${card.id}/edit`}
          type="button"
          className="btn btn-secondary m-1"
        >
          Edit
        </Link>
        <button
          onClick={handleDeleteCard}
          type="button"
          className="btn btn-danger m-1 ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ListCard;
