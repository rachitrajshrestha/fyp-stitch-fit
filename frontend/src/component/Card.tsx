import React from "react";
import cardProfile from "../assets/card1.png";
import "../style/Card.css";

const Card: React.FC = () => {
  return (
    <div className="card1" style={{ width: "24rem", height: "28rem" }}>
      <div className="card-img rounded-0">
        <img src={cardProfile} className="card-img-top" alt="..."></img>
      </div>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="btn btn-secondary w-5">
          Buy Now
        </a>
      </div>
    </div>
  );
};
export default Card;
