import { truncate } from "lodash";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Heart from "../Heart";
import "./PropertyCard.css";

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flexColStart r-card"
      onClick={() => navigate(`/properties/${card.id}`)}
    >
      <Heart id={card?.id} />
      <img src={card.image} alt="home" />

      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <sapn>{card.price}</sapn>
      </span>

      <span className="primaryText">
        {truncate(card?.title, { length: 18 })}
      </span>
      <span className="secondaryText">
        {truncate(card?.description, { length: 80 })}
      </span>
    </div>
  );
};

export default PropertyCard;
