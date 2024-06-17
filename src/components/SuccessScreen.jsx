import React from "react";

const SuccessScreen = ({ score, time }) => (
  <div className="w-[500px] p-5 rounded-lg flex flex-col gap-4 bg-[#1A2130]">
    <h1 className="text-white text-3xl font-bold font-mont">
      Congratulations!
    </h1>
    <p className="text-xl text-white font-mont">
      Your final score is :{" "}
      <span className="text-[#FFC700] font-bold">{score}</span>
    </p>
    <p className="text-xl text-white font-mont">
      Time taken : <span className="text-[#FFC700] font-bold">{time}</span>
    </p>
  </div>
);

export default SuccessScreen;
