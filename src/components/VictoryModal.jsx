import React from "react";
import { Confetti } from "../App";

// Victory Modal Component
const VictoryModal = ({ isOpen, stats, onPlayAgain }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-sm mx-4 relative overflow-hidden">
        <Confetti />
        <div className="relative z-10">
          {/* <button
            onClick={onClose}
            className="cursor-pointer float-right z-60 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
          >
            ×
          </button> */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-3xl sm:text-4xl mb-2">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4A4A68] mb-2">
              You Win!
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {stats.time} / {stats.moves} Moves
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full bg-[#AEE3F9] hover:bg-[#9DD4E8] text-[#4A4A68] font-semibold py-2 sm:py-3 rounded-2xl transition-colors text-sm sm:text-base"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
