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
    address,
    hit,
    stand,
    newGame,
    playOnChain,
    switchMode,
    resetCredits,
  } = useBlackjack();

  return (
    <div className="min-h-screen p-2 sm:p-6 bg-gradient-to-br from-gray-100 via-gray-50 to-yellow-50/20">
      <div className="max-w-4xl mx-auto">
        {/* Header - Compact for mobile */}
        <header className="text-center mb-2 sm:mb-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 drop-shadow-sm">
            🃏 Blackjack on Celo
          </h1>
        </header>

        {/* Mode Toggle & Wallet Info - Compact row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2 sm:mb-4">
          <div className="flex justify-center">
            <ModeToggle mode={mode} onModeChange={switchMode} />
          </div>

          {/* Connected Wallet Display (On-Chain Mode) */}
          {mode === 'onchain' && isConnected && address && (
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-celo-yellow shadow-sm text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-gray-800 font-medium">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
          )}
        </div>

        {/* Wallet Connection (On-Chain Mode Only) */}
        {mode === 'onchain' && !isConnected && (
          <div className="mb-3">
            <WalletConnect />
          </div>
        )}

        {/* Game Message */}
        {message && (
          <div className="mb-2">
            <GameMessage message={message} />
          </div>
        )}

        {/* Main Game Area - Compact for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-3">
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

          {/* Stats Sidebar - Hidden on mobile when game is active */}
          <div className={`${gamePhase === 'playing' ? 'hidden lg:block' : ''}`}>
            <GameStats
              stats={stats}
              mode={mode}
              credits={credits}
              onResetCredits={resetCredits}
            />
          </div>
        </div>

        {/* Farcaster Share (when game is finished) - Compact */}
        {gamePhase === 'finished' && outcome && (
          <div className="mb-3">
            <FarcasterShare result={outcome} stats={stats} />
          </div>
        )}

        {/* Footer - Smaller on mobile */}
        <footer className="text-center text-gray-500 text-xs mt-4 sm:mt-8 pb-4">
          <p className="hidden sm:block">
            Built with ❤️ on{" "}
            <a
              href="https://celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 font-semibold hover:text-celo-yellow transition-colors"
            >
              Celo
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
