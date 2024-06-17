import React, { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("playerName");
    if (storedName) setPlayerName(storedName);
  }, []);

  return (
    <div className="w-full h-[100vh]">
      {playerName === "" ? (
        <WelcomeScreen setPlayerName={setPlayerName} />
      ) : (
        <GameBoard playerName={playerName} />
      )}
    </div>
  );
};

export default App;
