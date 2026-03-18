'use client';

import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';

import { GiCardJoker } from 'react-icons/gi';
import { 
  FaAppleAlt, FaLemon, FaHeart, FaStar, 
  FaBolt, FaGem, FaFire, FaMoon, 
  FaSmile, FaMeh, FaSkull, FaUndoAlt,
  FaRegClock, FaMousePointer, FaCheck
} from 'react-icons/fa';

const ICONS = [
  { icon: FaHeart, color: '#ec4899' },   
  { icon: FaLemon, color: '#eab308' },   
  { icon: FaBolt, color: '#3b82f6' },    
  { icon: FaGem, color: '#8b5cf6' },     
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaStar, color: '#f97316' },    
  { icon: FaFire, color: '#f59e0b' },    
  { icon: FaMoon, color: '#4f46e5' },    
];

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (pairCount) => {
  const selectedIcons = ICONS.slice(0, pairCount);
  const paired = selectedIcons.flatMap((item, index) => [
    { id: index * 2, icon: item.icon, color: item.color, pairId: index},
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index},
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  const [difficulty, setDifficulty] = useState('Easy');
  
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const [time, setTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const getPairCount = (level) => {
    if (level === 'Hard') return 8;
    if (level === 'Medium') return 6;
    return 4; 
  };

  useEffect(() => {
    setCards(createCards(getPairCount(difficulty)));
  }, [difficulty]);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && !isGameWon) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isGameWon]);

  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      setIsGameWon(true);
      setIsTimerActive(false); 
    }
  }, [matchedCards, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      setMoves(prev => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);
  
  const handleCardFlip = (id) => {
    if (!isTimerActive && !isGameWon) {
      setIsTimerActive(true);
    }
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  const resetGame = (newLevel = difficulty) => {
    if (newLevel !== difficulty) {
      setDifficulty(newLevel);
    }
    setCards(createCards(getPairCount(newLevel)));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsTimerActive(false);
    setIsGameWon(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#16112f] bg-linear-to-b from-[#181236] to-[#120d26] p-6 pt-10 font-sans text-white">
      
      <h1 className="text-[2.5rem] font-extrabold mb-8 drop-shadow-lg flex items-center gap-3 cursor-default hover:scale-105 transition-transform duration-300">
        <GiCardJoker className="text-yellow-400 animate-pulse" />
        <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-100 via-pink-200 to-purple-200 tracking-wide hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-all duration-300">
          Memory Card
        </span>
      </h1>
      
      <div className="flex gap-3 mb-8">
        <button 
          onClick={() => resetGame('Easy')}
          className={`px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
            difficulty === 'Easy' 
              ? 'bg-yellow-400 text-black font-bold shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_25px_rgba(250,204,21,0.6)] scale-105' 
              : 'bg-[#292244] text-gray-300 font-medium hover:bg-[#3f3468] hover:shadow-lg'
          }`}
        >
          <FaSmile className={difficulty === 'Easy' ? 'text-black' : 'text-gray-400'} /> Easy (4)
        </button>

        <button 
          onClick={() => resetGame('Medium')}
          className={`px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
            difficulty === 'Medium' 
              ? 'bg-yellow-400 text-black font-bold shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_25px_rgba(250,204,21,0.6)] scale-105' 
              : 'bg-[#292244] text-gray-300 font-medium hover:bg-[#3f3468] hover:shadow-lg'
          }`}
        >
          <FaMeh className={difficulty === 'Medium' ? 'text-black' : 'text-gray-400'} /> Medium (6)
        </button>

        <button 
          onClick={() => resetGame('Hard')}
          className={`px-6 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
            difficulty === 'Hard' 
              ? 'bg-yellow-400 text-black font-bold shadow-[0_4px_20px_rgba(250,204,21,0.4)] hover:shadow-[0_6px_25px_rgba(250,204,21,0.6)] scale-105' 
              : 'bg-[#292244] text-gray-300 font-medium hover:bg-[#3f3468] hover:shadow-lg'
          }`}
        >
          <FaSkull className={difficulty === 'Hard' ? 'text-black' : 'text-gray-400'}/> Hard (8)
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="bg-[#292244] rounded-xl p-3 flex flex-col items-center justify-center min-w-[110px] shadow-lg border border-white/5 transition-all hover:bg-[#342b56]">
          <div className="text-[10px] text-gray-400 font-bold tracking-wider mb-1 flex items-center gap-1.5 uppercase">
            <FaRegClock /> Waktu
          </div>
          <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
        </div>

        <div className="bg-[#292244] rounded-xl p-3 flex flex-col items-center justify-center min-w-[110px] shadow-lg border border-white/5 transition-all hover:bg-[#342b56]">
          <div className="text-[10px] text-gray-400 font-bold tracking-wider mb-1 flex items-center gap-1.5 uppercase">
            <FaMousePointer className="text-[9px]" /> Percobaan
          </div>
          <div className="text-2xl font-bold text-white">{moves}</div>
        </div>

        <div className="bg-[#292244] rounded-xl p-3 flex flex-col items-center justify-center min-w-[110px] shadow-lg border border-white/5 transition-all hover:bg-[#342b56]">
          <div className="text-[10px] text-gray-400 font-bold tracking-wider mb-1 flex items-center gap-1.5 uppercase">
            <FaCheck className="text-[10px]" /> Ditemukan
          </div>
          <div className="text-2xl font-bold text-white">
            {matchedCards.length / 2} / {getPairCount(difficulty)}
          </div>
        </div>
      </div>

      {isGameWon && (
        <div className="bg-[#4a3429] border border-[#7a5c3d] text-yellow-500 px-6 py-4 rounded-xl mb-6 text-center max-w-md w-full shadow-lg animate-fade-in hover:scale-105 transition-transform cursor-default">
          <p className="font-semibold">
            🎉 Selamat! Selesai dalam waktu {formatTime(time)} dengan {moves} percobaan!
          </p>
        </div>
      )}

      <button 
        onClick={() => resetGame(difficulty)}
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2.5 px-8 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.6)] mb-8 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 flex items-center gap-2"
      >
        <FaUndoAlt /> Main Lagi
      </button>

      <div className="bg-[#1f163b]/80 border border-white/5 p-6 rounded-4xl shadow-[0_0_40px_rgba(139,92,246,0.1)]">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
        />
      </div>
    </div>
  );
}