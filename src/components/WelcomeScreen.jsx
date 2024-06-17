import React, { useState } from "react";

const Welcomescreen = ({ setPlayerName }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("playerName", name);
    setPlayerName(name);
  };

  return (
    <div className="w-full h-full py-5 flex flex-col justify-center bg-[#1A2130]">
      <h1 className="font-mont text-3xl text-white text-center font-bold mb-5">
        Welcome to the Tile Matching Game
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-4 mt-5"
      >
        <input
          className="border-white border-2 rounded-md px-2 py-2 text-white bg-[#1A2130]"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-white p-3 rounded-full">Start Game</button>
      </form>
    </div>
  );
};

export default Welcomescreen;
