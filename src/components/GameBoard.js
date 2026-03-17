import React from "react";
import Card from "./Card";

function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {

    return (
        <div className="w-full max-w-3xl mx-auto mt-4 p-6 sm:p-10 bg-white/10 backdrop-blur-md rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/20 transition-all duration-500">
            
            <div className="grid grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        isFlipped={flippedCards.includes(card.id)}
                        isMatched={matchedCards.includes(card.id)}
                        onFlip={onFlip}
                    />
                ))}

            </div>
        </div>
    );
}

export default GameBoard;