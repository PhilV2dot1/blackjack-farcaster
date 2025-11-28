// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Blackjack
 * @notice On-chain Blackjack game with provably fair randomness
 * @dev Uses block.prevrandao for randomness - games tracked per player
 */
contract Blackjack {
    struct GameResult {
        uint8[] playerCards;
        uint8[] dealerCards;
        uint8 playerTotal;
        uint8 dealerTotal;
        string outcome; // "win", "lose", "push", "blackjack"
    }

    struct PlayerStats {
        uint256 wins;
        uint256 losses;
        uint256 pushes;
        uint256 blackjacks;
        uint256 totalGames;
        int256 currentStreak; // Positive for wins, negative for losses
        uint256 bestStreak;
    }

    // Player address => their stats
    mapping(address => PlayerStats) public playerStats;

    event GamePlayed(
        address indexed player,
        uint8[] playerCards,
        uint8[] dealerCards,
        uint8 playerTotal,
        uint8 dealerTotal,
        string outcome
    );

    /**
     * @notice Play a game of Blackjack
     * @dev Simulates full game: deal, player logic (simplified), dealer logic
     * @return result The complete game result
     */
    function playGame() external returns (GameResult memory result) {
        // Initialize random seed using block randomness
        uint256 seed = uint256(keccak256(abi.encodePacked(
            block.prevrandao,
            block.timestamp,
            msg.sender,
            playerStats[msg.sender].totalGames
        )));

        // Deal initial cards (player gets 2, dealer gets 2)
        result.playerCards = new uint8[](2);
        result.dealerCards = new uint8[](2);

        result.playerCards[0] = drawCard(seed, 0);
        result.playerCards[1] = drawCard(seed, 1);
        result.dealerCards[0] = drawCard(seed, 2);
        result.dealerCards[1] = drawCard(seed, 3);

        // Calculate initial totals
        result.playerTotal = calculateHandTotal(result.playerCards);
        result.dealerTotal = calculateHandTotal(result.dealerCards);

        // Check for natural blackjack (21 with 2 cards)
        bool playerBlackjack = result.playerTotal == 21;
        bool dealerBlackjack = result.dealerTotal == 21;

        if (playerBlackjack && dealerBlackjack) {
            result.outcome = "push";
        } else if (playerBlackjack) {
            result.outcome = "blackjack";
        } else if (dealerBlackjack) {
            result.outcome = "lose";
        } else {
            // Simulate player strategy: hit until 17 or bust
            uint8 cardIndex = 4;
            while (result.playerTotal < 17 && result.playerTotal <= 21) {
                uint8 newCard = drawCard(seed, cardIndex);
                result.playerCards = appendCard(result.playerCards, newCard);
                result.playerTotal = calculateHandTotal(result.playerCards);
                cardIndex++;
            }

            // If player busts, dealer doesn't play
            if (result.playerTotal > 21) {
                result.outcome = "lose";
            } else {
                // Dealer plays: hit on 16 or less, stand on 17 or more
                while (result.dealerTotal < 17) {
                    uint8 newCard = drawCard(seed, cardIndex);
                    result.dealerCards = appendCard(result.dealerCards, newCard);
                    result.dealerTotal = calculateHandTotal(result.dealerCards);
                    cardIndex++;
                }

                // Determine winner
                if (result.dealerTotal > 21) {
                    result.outcome = "win";
                } else if (result.playerTotal > result.dealerTotal) {
                    result.outcome = "win";
                } else if (result.playerTotal < result.dealerTotal) {
                    result.outcome = "lose";
                } else {
                    result.outcome = "push";
                }
            }
        }

        // Update player stats
        updateStats(msg.sender, result.outcome);

        // Emit event
        emit GamePlayed(
            msg.sender,
            result.playerCards,
            result.dealerCards,
            result.playerTotal,
            result.dealerTotal,
            result.outcome
        );

        return result;
    }

    /**
     * @notice Get player statistics
     * @return wins Number of wins
     * @return losses Number of losses
     * @return pushes Number of pushes
     * @return blackjacks Number of blackjacks
     * @return totalGames Total games played
     * @return winRate Win rate (percentage * 100)
     * @return currentStreak Current win/loss streak
     * @return bestStreak Best win streak
     */
    function getStats() external view returns (
        uint256 wins,
        uint256 losses,
        uint256 pushes,
        uint256 blackjacks,
        uint256 totalGames,
        uint256 winRate,
        int256 currentStreak,
        uint256 bestStreak
    ) {
        PlayerStats memory stats = playerStats[msg.sender];
        wins = stats.wins;
        losses = stats.losses;
        pushes = stats.pushes;
        blackjacks = stats.blackjacks;
        totalGames = stats.totalGames;

        // Calculate win rate (wins + blackjacks) / totalGames * 10000 (for 2 decimal precision)
        if (totalGames > 0) {
            winRate = ((stats.wins + stats.blackjacks) * 10000) / totalGames;
        } else {
            winRate = 0;
        }

        currentStreak = stats.currentStreak;
        bestStreak = stats.bestStreak;
    }

    /**
     * @dev Draw a card (1-13) using seed and index
     * @param seed Random seed
     * @param index Card index for uniqueness
     * @return Card value (1-13, where 1=Ace, 11=Jack, 12=Queen, 13=King)
     */
    function drawCard(uint256 seed, uint256 index) internal pure returns (uint8) {
        uint256 random = uint256(keccak256(abi.encodePacked(seed, index)));
        return uint8((random % 13) + 1);
    }

    /**
     * @dev Calculate hand total with Ace logic (Aces count as 11 or 1)
     * @param cards Array of card values
     * @return Total hand value
     */
    function calculateHandTotal(uint8[] memory cards) internal pure returns (uint8) {
        uint8 total = 0;
        uint8 aces = 0;

        // First pass: count aces and sum other cards
        for (uint256 i = 0; i < cards.length; i++) {
            if (cards[i] == 1) {
                aces++;
                total += 11; // Count Ace as 11 initially
            } else if (cards[i] >= 11 && cards[i] <= 13) {
                total += 10; // Face cards count as 10
            } else {
                total += cards[i];
            }
        }

        // Second pass: convert Aces from 11 to 1 if busting
        while (total > 21 && aces > 0) {
            total -= 10; // Convert one Ace from 11 to 1
            aces--;
        }

        return total;
    }

    /**
     * @dev Append a card to an array
     * @param cards Existing cards
     * @param newCard New card to append
     * @return New array with appended card
     */
    function appendCard(uint8[] memory cards, uint8 newCard) internal pure returns (uint8[] memory) {
        uint8[] memory newCards = new uint8[](cards.length + 1);
        for (uint256 i = 0; i < cards.length; i++) {
            newCards[i] = cards[i];
        }
        newCards[cards.length] = newCard;
        return newCards;
    }

    /**
     * @dev Update player statistics
     * @param player Player address
     * @param outcome Game outcome
     */
    function updateStats(address player, string memory outcome) internal {
        PlayerStats storage stats = playerStats[player];
        stats.totalGames++;

        if (keccak256(bytes(outcome)) == keccak256(bytes("win"))) {
            stats.wins++;
            if (stats.currentStreak >= 0) {
                stats.currentStreak++;
            } else {
                stats.currentStreak = 1;
            }
        } else if (keccak256(bytes(outcome)) == keccak256(bytes("blackjack"))) {
            stats.blackjacks++;
            stats.wins++; // Count blackjacks as wins for streak
            if (stats.currentStreak >= 0) {
                stats.currentStreak++;
            } else {
                stats.currentStreak = 1;
            }
        } else if (keccak256(bytes(outcome)) == keccak256(bytes("lose"))) {
            stats.losses++;
            if (stats.currentStreak <= 0) {
                stats.currentStreak--;
            } else {
                stats.currentStreak = -1;
            }
        } else if (keccak256(bytes(outcome)) == keccak256(bytes("push"))) {
            stats.pushes++;
            // Push doesn't affect streak
        }

        // Update best streak (only positive streaks)
        if (stats.currentStreak > 0 && uint256(stats.currentStreak) > stats.bestStreak) {
            stats.bestStreak = uint256(stats.currentStreak);
        }
    }
}
