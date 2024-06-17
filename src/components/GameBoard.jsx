import { useState, useEffect, useRef } from "react";
import Tile from "./Tile";
import SuccessScreen from "./SuccessScreen";
// import angel from "../../public/images/angel.png";
// import devil from "../../public/images/devil.png";
// import ghost from "../../public/images/ghost.png";
// import heart from "../../public/images/heart.png";
// import joy from "../../public/images/joy.png";
// import smile_heart from "../../public/images/smile_heart.png";
// import smiling from "../../public/images/smiling.png";
// import superstar from "../../public/images/superstar.png";

const generateTiles = () => {
  const tiles = [];
  const images = [
    "angel",
    "devil",
    "ghost",
    "heart",
    "joy",
    "smile_heart",
    "smiling",
    "superstar",
  ];
  const doubledImages = [...images, ...images];
  doubledImages.sort(() => Math.random() - 0.5);
  doubledImages.forEach((image, index) => {
    tiles.push({ id: index, image, isRevealed: false, isMatched: false });
  });
  return tiles;
};

const GameBoard = ({ playerName }) => {
  const [tiles, setTiles] = useState(generateTiles());
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (flippedTiles.length === 2) {
      const [firstTile, secondTile] = flippedTiles;
      if (firstTile.image === secondTile.image) {
        setTiles((prevTiles) =>
          prevTiles.map((tile) =>
            tile.image === firstTile.image ? { ...tile, isMatched: true } : tile
          )
        );
        setScore((prevScore) => prevScore + 1);
      } else {
        setTimeout(() => {
          setTiles((prevTiles) =>
            prevTiles.map((tile) =>
              tile.id === firstTile.id || tile.id === secondTile.id
                ? { ...tile, isRevealed: false }
                : tile
            )
          );
          setScore((prevScore) => prevScore - 1);
        }, 1000);
      }
      setFlippedTiles([]);
    }
  }, [flippedTiles]);

  useEffect(() => {
    if (tiles.every((tile) => tile.isMatched)) {
      clearInterval(timerRef.current);
    }
  }, [tiles]);

  const handleTileClick = (id) => {
    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.id === id ? { ...tile, isRevealed: true } : tile
      )
    );
    setFlippedTiles((prevFlipped) => [
      ...prevFlipped,
      tiles.find((tile) => tile.id === id),
    ]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="w-full h-full bg-[#1A2130] relative">
      <div className="w-full flex justify-center gap-5">
        <span className="text-3xl text-white font-bold">
          Score : <span className="text-[#FFC700]">{score}</span>
        </span>
        <span className="text-3xl text-white font-bold">
          Time : <span className="text-[#FFC700]">{formatTime(time)}</span>
        </span>
        <span className="text-3xl text-white font-bold">
          Player : <span className="text-[#FFC700]">{playerName}</span>
        </span>
      </div>
      <div className="w-full flex items-center justify-center mt-5">
        <div className="w-1/2 flex justify-center flex-wrap gap-3">
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              tile={tile}
              onClick={() => handleTileClick(tile.id)}
            />
          ))}
        </div>
      </div>
      {tiles.every((tile) => tile.isMatched) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1A2130] bg-opacity-80">
          <SuccessScreen score={score} time={formatTime(time)} />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
