"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { shareBlackjackResult, type GameStats } from "@/lib/farcaster";
import type { Outcome } from "@/lib/cards";

interface FarcasterShareProps {
  result: Outcome;
  stats: GameStats;
}

export function FarcasterShare({ result, stats }: FarcasterShareProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
      await shareBlackjackResult(result, stats, appUrl);
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      // Keep button disabled for a moment to prevent double-sharing
      setTimeout(() => setIsSharing(false), 2000);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleShare}
      disabled={isSharing}
      className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
    >
      {isSharing ? "Sharing..." : "📣 Share on Farcaster"}
    </motion.button>
  );
}
