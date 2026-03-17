import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

function ScoreBoard({ moves, matchedCount, totalPairs, onReset, timer, currentDifficulty, onDifficultyChange }) {
    const isGameComplete = matchedCount === totalPairs;

    return (
        <div className="text-center mb-6">
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
                
                <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-lg flex items-center gap-3 shadow-md border border-white/30 transition-all hover:bg-white/30">
                    <FaClock className="text-indigo-300 text-xl animate-pulse" />
                    <div className="text-left">
                        <p className="text-xs text-indigo-200 uppercase tracking-wider font-semibold">Waktu</p>
                        <p className="text-2xl font-bold text-white">{timer}s</p>
                    </div>
                </div>

                <div className="flex gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner">
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                        <button
                            key={level}
                            onClick={() => onDifficultyChange(level)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                                currentDifficulty === level 
                                ? 'bg-indigo-500 text-white shadow-lg transform scale-105' 
                                : 'text-indigo-200 hover:bg-white/20 hover:text-white'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

            </div>

            <div className="flex justify-center gap-8 mb-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                            <FaMousePointer className="text-indigo-300" /> Percobaan
                    </p>
                    <p className="text-2xl font-bold text-white">{moves}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                            <FaCheck className="text-indigo-300" /> Ditemukan
                    </p>
                    <p className="text-2xl font-bold text-white">{matchedCount} / {totalPairs}</p>
                </div>

            </div>

            {isGameComplete && (
                <p className={"text-yellow-300 text-lg mb-2 animate-pulse"}>
                    Selamat! Kamu menang dalam {moves} percobaan!
                </p>
            )}

            <button

                    onClick={onReset}
                    className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300
                    transition-colors duration-200 shadow-lg flex items-center gap-2 mx-auto"
            >
                    {isGameComplete ? <FaRedo /> : <FaSyncAlt />} 
                    {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
            </button>
        </div>
    );
}

export default ScoreBoard;