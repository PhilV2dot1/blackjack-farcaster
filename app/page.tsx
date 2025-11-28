"use client";

import { useBlackjack } from "@/hooks/useBlackjack";
import { BlackjackTable } from "@/components/BlackjackTable";
import { GameControls } from "@/components/GameControls";
import { GameStats } from "@/components/GameStats";
import { ModeToggle } from "@/components/ModeToggle";
import { WalletConnect } from "@/components/WalletConnect";
import { FarcasterShare } from "@/components/FarcasterShare";
import { GameMessage } from "@/components/GameMessage";

export default function Home() {
  const {
    mode,
    gamePhase,
    playerHand,
    dealerHand,
    playerTotal,
    dealerTotal,
    outcome,
    message,
    stats,
    credits,
    isPending,
    showDealerCard,
    isConnected,
    hit,
    stand,
    newGame,
    playOnChain,
    switchMode,
    resetCredits,
  } = useBlackjack();

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-celo-yellow mb-2 drop-shadow-lg">
            🃏 Blackjack on Celo
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Play free or on-chain with Celo blockchain
          </p>
        </header>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <ModeToggle mode={mode} onModeChange={switchMode} />
        </div>

        {/* Wallet Connection (On-Chain Mode Only) */}
        {mode === 'onchain' && !isConnected && (
          <div className="mb-6">
            <WalletConnect />
          </div>
        )}

        {/* Game Message */}
        {message && (
          <div className="mb-4">
            <GameMessage message={message} />
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Game Table (spans 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <BlackjackTable
              playerCards={playerHand}
              dealerCards={dealerHand}
              playerTotal={playerTotal}
              dealerTotal={dealerTotal}
              showDealerCard={showDealerCard}
            />

            {/* Game Controls */}
            <GameControls
              onHit={hit}
              onStand={stand}
              onNewGame={newGame}
              onPlayOnChain={playOnChain}
              gamePhase={gamePhase}
              mode={mode}
              disabled={isPending}
            />
          </div>

          {/* Stats Sidebar */}
          <div>
            <GameStats
              stats={stats}
              mode={mode}
              credits={credits}
              onResetCredits={resetCredits}
            />
          </div>
        </div>

        {/* Farcaster Share (when game is finished) */}
        {gamePhase === 'finished' && outcome && (
          <div className="mb-6">
            <FarcasterShare result={outcome} stats={stats} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-12 pb-4">
          <p>
            Built with ❤️ on{" "}
            <a
              href="https://celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-celo-yellow hover:underline"
            >
              Celo
            </a>
          </p>
          <p className="mt-1 text-xs">
            Free Play: Virtual credits | On-Chain: Provably fair on Celo blockchain
          </p>
        </footer>
      </div>
    </div>
  );
}
