import { Card } from "@/lib/cards";

interface CardDisplayProps {
  card: Card | null;
  faceDown?: boolean;
}

export function CardDisplay({ card, faceDown }: CardDisplayProps) {
  if (faceDown || !card) {
    return (
      <div className="w-16 h-24 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg border-2 border-white flex items-center justify-center shadow-lg">
        <div className="text-white text-3xl">🂠</div>
      </div>
    );
  }

  const isRed = card.suit === '♥' || card.suit === '♦';

  return (
    <div className="w-16 h-24 bg-white rounded-lg border-2 border-gray-300 p-1 flex flex-col items-center justify-between shadow-lg">
      <div className={`text-lg font-bold ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.display}
      </div>
      <div className={`text-3xl ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.suit}
      </div>
      <div className={`text-lg font-bold ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.display}
      </div>
    </div>
  );
}
