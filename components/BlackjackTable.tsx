import { Card } from "@/lib/cards";
import { PlayerHand, DealerHand } from "./Hands";

interface BlackjackTableProps {
  playerCards: Card[];
  dealerCards: Card[];
  playerTotal: number;
  dealerTotal: number;
  showDealerCard: boolean;
}

export function BlackjackTable({
  playerCards,
  dealerCards,
  playerTotal,
  dealerTotal,
  showDealerCard
}: BlackjackTableProps) {
  return (
    <div
      className="bg-gradient-to-br from-green-800 via-green-700 to-green-900 rounded-3xl p-8 shadow-2xl border-4"
      style={{
        boxShadow: "0 0 0 4px #FCFF52, 0 20px 25px -5px rgba(0, 0, 0, 0.3)"
      }}
    >
      {/* Dealer Section */}
      <div className="mb-12">
        <DealerHand
          cards={dealerCards}
          total={dealerTotal}
          hideFirstCard={!showDealerCard}
        />
      </div>

      {/* Divider */}
      {playerCards.length > 0 && dealerCards.length > 0 && (
        <div className="border-t-2 border-white/20 my-8"></div>
      )}

      {/* Player Section */}
      <div className="mt-12">
        <PlayerHand
          cards={playerCards}
          total={playerTotal}
        />
      </div>
    </div>
  );
}
