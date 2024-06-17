import React from "react";

const Tile = ({ tile, onClick }) => (
  <div
    className={`w-[150px] h-[150px] rounded-md bg-white flex items-center ${
      tile.isRevealed ? "revealed" : ""
    }`}
    onClick={onClick}
  >
    <div className="w-full flex items-center justify-center">
      <h1 className="text-center font-bold font-mont">
        {!tile.isRevealed ? "Flip Me!" : ""}
      </h1>
      {tile.isRevealed || tile.isMatched ? (
        <img
          src={`/images/${tile.image}.png`}
          alt="tile"
          className="h-[90px] w-[90px]"
        />
      ) : null}
    </div>
  </div>
);

export default Tile;
