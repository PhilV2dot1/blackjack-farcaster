import type { GamePhase } from "@/hooks/useBlackjack";

interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onNewGame: () => void;
  onPlayOnChain: () => void;
  gamePhase: GamePhase;
  mode: 'free' | 'onchain';
  disabled: boolean;
}

export function GameControls({
  onHit,
  onStand,
  onNewGame,
  onPlayOnChain,
  gamePhase,
  mode,
  disabled
}: GameControlsProps) {
  // Show play buttons when in playing phase (free mode only)
  const showPlayButtons = gamePhase === 'playing' && mode === 'free';

  // Show new game button when finished or in betting phase
  const showNewGameButton = (gamePhase === 'finished' || gamePhase === 'betting') && mode === 'free';

  // Show play on-chain button when in betting phase and on-chain mode
  const showOnChainButton = gamePhase === 'betting' && mode === 'onchain';

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      {showPlayButtons && (
        <>
          <button
            onClick={onHit}
            disabled={disabled}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 min-w-[120px]"
          >
            HIT
          </button>
          <button
            onClick={onStand}
            disabled={disabled}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 min-w-[120px]"
          >
            STAND
          </button>
        </>
      )}

      {showNewGameButton && (
        <button
          onClick={onNewGame}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 min-w-[140px]"
        >
          NEW GAME
        </button>
      )}

      {showOnChainButton && (
        <button
          onClick={onPlayOnChain}
          disabled={disabled}
          className="px-8 py-4 bg-gradient-to-r from-celo-yellow to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 min-w-[160px]"
          style={{
            boxShadow: "0 0 0 2px #FCFF52, 0 10px 15px -3px rgba(0, 0, 0, 0.2)"
          }}
        >
          PLAY ON-CHAIN
        </button>
      )}
    </div>
  );
}
