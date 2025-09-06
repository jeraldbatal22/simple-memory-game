import { useEffect, useState, useCallback } from 'react';
import React from 'react';
import basket from '/assets/basket.png';
import candle from '/assets/candle.png';
import cauldron from '/assets/cauldron.png';
import crystalBall from '/assets/crystal-ball.png';
import death from '/assets/death.png';
import greenSlime from '/assets/green-slime.png';
import knife from '/assets/knife.png';
import mapleLeaf from '/assets/maple-leaf.png';
import mask from '/assets/mask.png';
import mummy from '/assets/mummy.png';
import paperBag from '/assets/paper-bag.png';
import pumpkin from '/assets/pumpkin.png';
import scarecrow from '/assets/scarecrow.png';
import scythe from '/assets/scythe.png';
import tombstone from '/assets/tombstone.png';
import vampire from '/assets/vampire.png';
import { useTimeCount } from './hooks/useTimeCount';
import VictoryModal from './components/VictoryModal';
import SettingsModal from './components/SettingsModal';

const icons = [
  basket,
  candle,
  cauldron,
  crystalBall,
  death,
  greenSlime,
  knife,
  mapleLeaf,
  mask,
  mummy,
  paperBag,
  pumpkin,
  scarecrow,
  scythe,
  tombstone,
  vampire,
];

// Difficulty levels configuration
const DIFFICULTY_LEVELS = {
  easy: { name: 'Easy', grid: '3x4', rows: 3, cols: 4, pairs: 6 },
  medium: { name: 'Medium', grid: '4x4', rows: 4, cols: 4, pairs: 8 },
  hard: { name: 'Hard', grid: '6x6', rows: 6, cols: 6, pairs: 18 },
};

// Shuffle helper
function shuffle(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const colors = [
  '#AEE3F9', // Light Blue
  '#F7D1E1', // Soft Pink
  '#C9C4F5', // Lavender Purple
  '#FBC7B6', // Peach/Coral
  '#B8EAD9', // Mint Green
  '#F8E19C', // Soft Yellow
  '#FFB6C1', // Light Pink
  '#DDA0DD', // Plum
  '#98FB98', // Pale Green
  '#F0E68C', // Khaki
];

// Confetti component
export const Confetti = () => (
  <div className="confetti-container">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="confetti"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
      />
    ))}
  </div>
);

function App() {
  const [items, setItems] = useState([]);
  const [filteredMatchItem, setFilteredMatchItem] = useState([]);
  const [countMoved, setCountMoved] = useState(0);
  const [bestScore, setBestScore] = useState({ time: '00:00', moves: 0 });
  const [compareItem, setCompareItem] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    darkMode: false,
  });

  const { minutes, seconds, formatTime, startTimer, stopTimer, pauseTimer } = useTimeCount();

  const currentDifficulty = DIFFICULTY_LEVELS[difficulty];
  const totalPairs = currentDifficulty.pairs;
  const matchedPairs = filteredMatchItem.length / 2;
  console.log(matchedPairs, matchedPairs / totalPairs)
  const progressPercentage = (matchedPairs / totalPairs) * 100;
  console.log(progressPercentage)
  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem(`memory-game-best-${difficulty}`);
    console.log(savedBestScore)
    if (savedBestScore) {
      setBestScore(JSON.parse(savedBestScore));
    } else {
      setBestScore({ time: '00:00', moves: 0 });
    }
  }, [difficulty]);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('memory-game-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('memory-game-settings', JSON.stringify(settings));
  }, [settings]);

  // Generate shuffled icons based on difficulty
  const getShuffledIcons = useCallback(() => {
    const iconsToUse = icons.slice(0, totalPairs);
    const paired = [...iconsToUse, ...iconsToUse].map((icon, idx) => ({
      id: `${icon}-${idx}`,
      icon,
      isFlip: false,
      isCompleted: false,
    }));
    const shuffleItems = shuffle(paired);
    setItems(shuffleItems);
  }, [totalPairs]);

  useEffect(() => {
    getShuffledIcons();
  }, [getShuffledIcons]);

  const handlePlayAgain = () => {
    getShuffledIcons();
    setCountMoved(0);
    stopTimer();
    setFilteredMatchItem([]);
    setCompareItem([]);
    setShowVictoryModal(false);
  };

  const handleRestart = () => {
    getShuffledIcons();
    setCountMoved(0);
    stopTimer();
    setFilteredMatchItem([]);
    setCompareItem([]);
  };


  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const playSound = useCallback((soundType) => {
    if (!settings.soundEnabled) return;
    
    // Simple sound effects using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (soundType === 'flip') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    } else if (soundType === 'match') {
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
    } else if (soundType === 'win') {
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }, [settings.soundEnabled]);

  const handleFlip = (item, key) => {
    if (item.isFlip || item.isCompleted) return;
    
    startTimer();
    playSound('flip');
    
    let cloneItems = items;
    setCompareItem([...compareItem, item]);
    
    const flippedCount = cloneItems.filter((cItem) => cItem.isFlip).length;
    
    if (flippedCount === 1) {
      setCountMoved((prevState) => prevState + 1);
    }
    
    if (flippedCount >= 2) {
      cloneItems = cloneItems.map((item) => ({ ...item, isFlip: false }));
      setCompareItem([item]);
    }
    
    const filteredIds = new Set(filteredMatchItem.map((item) => item.id));
    const newItems = cloneItems.map((item, i) => {
      if (filteredIds.has(item.id)) {
        return { ...item, isCompleted: true };
      }
      
      if (i === key || item.isFlip) {
        return {
          ...item,
          isFlip: true,
        };
      }
      
      return item;
    });
    
    setItems(newItems);
  };

  // Check for matches
  useEffect(() => {
    if (compareItem.length > 1 && compareItem[0].icon === compareItem[1].icon) {
      setFilteredMatchItem((prevState) => [...prevState, ...compareItem]);
      playSound('match');
    }
  }, [compareItem, playSound]);

  // Check for game completion
  useEffect(() => {
    if (filteredMatchItem.length === items.length && items.length > 0) {
      pauseTimer();
      const currentTime = `${formatTime(minutes)}:${formatTime(seconds)}`;
      const currentMoves = countMoved;
      
      // Update best score if current score is better
      const currentBestScore = localStorage.getItem(`memory-game-best-${difficulty}`);
      if (!currentBestScore || 
          currentMoves < bestScore.moves || 
          (currentMoves === bestScore.moves && seconds < parseInt(bestScore.time.split(':')[1]))) {
        const newBestScore = { time: currentTime, moves: currentMoves };
        setBestScore(newBestScore);
        localStorage.setItem(`memory-game-best-${difficulty}`, JSON.stringify(newBestScore));
      }
      
      playSound('win');
      setShowVictoryModal(true);
    }
  }, [filteredMatchItem, items, minutes, seconds, countMoved, difficulty, bestScore, formatTime, pauseTimer, playSound]);

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900' : 'bg-pastel'} flex items-center justify-center transition-colors py-4`}>
      <div className="w-full max-w-xl mx-4 px-2 sm:px-4">
        {/* Header */}
        <div className="text-center space-y-2 mb-4 sm:mb-6">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${settings.darkMode ? 'text-white' : 'text-[#4A4A68]'}`}>
            Memory Game
          </h1>
        </div>

        {/* Game Stats and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 sm:mb-6 space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl lg:text-2xl">🕐</span>
              <span className={`text-lg sm:text-xl font-semibold ${settings.darkMode ? 'text-white' : 'text-[#4A4A68]'}`}>
                {formatTime(minutes)}:{formatTime(seconds)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl lg:text-2xl">🔄</span>
              <span className={`text-lg sm:text-xl font-semibold ${settings.darkMode ? 'text-white' : 'text-[#4A4A68]'}`}>
                Moves: {countMoved}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={handleRestart}
              className="bg-[#AEE3F9] hover:bg-[#9DD4E8] text-[#4A4A68] font-semibold px-3 sm:px-4 py-2 rounded-xl transition-colors text-sm sm:text-base"
            >
              Restart
            </button>
            
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={`px-3 sm:px-4 py-2 rounded-xl font-semibold border-2 border-[#AEE3F9] text-sm sm:text-base ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-[#4A4A68]'}`}
            >
              {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                <option key={key} value={key}>
                  {level.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setShowSettingsModal(true)}
              className={`p-2 rounded-xl ${settings.darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-[#4A4A68]'} transition-colors`}
            >
              <span className="text-lg sm:text-xl">⚙️</span>
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div className={`grid grid-cols-4 gap-2 sm:gap-3 justify-center mb-4 sm:mb-6`}>
          {items.map((item, key) => (
            <div
              onClick={() => handleFlip(item, key)}
              style={{ backgroundColor: colors[key % colors.length] }}
              key={key}
              className={`h-18 w-18 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-xl sm:rounded-2xl cursor-pointer transition-transform hover:scale-105 ${
                item.isCompleted ? 'opacity-50' : ''
              }`}
            >
              {(item?.isFlip || item?.isCompleted) && (
                <img 
                  src={item.icon} 
                  className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                  alt="card" 
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="space-y-3 sm:space-y-4">
          {/* Progress Tracker */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm sm:text-base lg:text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-[#4A4A68]'}`}>
                {matchedPairs}/{totalPairs} Pairs Matched
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div
                className="bg-gradient-to-r from-[#AEE3F9] to-[#C9C4F5] h-2 sm:h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Best Score */}
          <div className="text-center">
            <span className={`text-sm sm:text-base lg:text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-[#4A4A68]'}`}>
              Best: {bestScore.time} / {bestScore.moves} Moves
            </span>
          </div>
        </div>

        {/* Victory Modal */}
        <VictoryModal
          isOpen={showVictoryModal}
          stats={{ time: `${formatTime(minutes)}:${formatTime(seconds)}`, moves: countMoved }}
          onPlayAgain={handlePlayAgain}
          onClose={() => setShowVictoryModal(false)}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
    </div>
  );
}

export default App;