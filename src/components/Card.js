import React from "react";
import { FaQuestion } from "react-icons/fa";

function Card({ card, isFlipped, isMatched, onFlip }) {
    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onFlip(card.id);
        }
    };

    const isOpen = isFlipped || isMatched;
    const IconComponent = card.icon;

    const cardClass = `w-20 h-20 flex items-center justify-center text-3xl rounded-xl cursor-pointer select-none transition-all duration-300 transform 
    ${isOpen ? 'bg-white shadow-md scale-100' : 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg scale-105 hover:shadow-xl'}
    ${isMatched ? 'opacity-70 ring-2 ring-green-400' : ''}`;

    return (
        <div 
            onClick={handleClick} 
            className={`relative w-20 h-20 sm:w-24 sm:h-24 cursor-pointer group [perspective:1000px] select-none ${isMatched ? 'opacity-70' : ''}`}
        >
            <div 
                className={`w-full h-full transition-transform duration-500 [transform-style:preserve-3d] relative 
                ${isOpen ? '[transform:rotateY(180deg)]' : ''}`}
            >
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md group-hover:scale-105 transition-transform duration-300 border border-white/20">
                    <FaQuestion className="text-white/60 text-2xl" />
                </div>

                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center rounded-xl bg-white shadow-xl ring-2 ring-indigo-100">

                    <span className={isMatched ? "animate-pulse scale-110 transition-transform" : ""}>
                        {IconComponent && <IconComponent className="text-4xl" style={{ color: card.color }} />}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Card;