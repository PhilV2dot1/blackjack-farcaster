# Blackjack Smart Contract

On-chain Blackjack game with provably fair randomness using block.prevrandao.

## Features

- ✅ Full Blackjack game simulation on-chain
- ✅ Player statistics tracking (wins, losses, pushes, blackjacks, streaks)
- ✅ Provably fair randomness (block.prevrandao + block.timestamp)
- ✅ Gas-optimized for Celo
- ✅ Event emission for game results

## Contract Details

### Functions

#### `playGame()`
Plays a complete game of Blackjack and returns the result.
- Deals 2 cards to player and dealer
- Player automatically hits until 17+ (simplified strategy)
- Dealer hits on 16 or less, stands on 17+
- Returns full game state including all cards and totals
- Emits `GamePlayed` event

#### `getStats()`
Returns player statistics:
- `wins`: Number of wins
- `losses`: Number of losses
- `pushes`: Number of pushes (ties)
- `blackjacks`: Number of blackjacks (21 with 2 cards)
- `totalGames`: Total games played
- `winRate`: Win percentage (scaled by 10000 for 2 decimals)
- `currentStreak`: Current win/loss streak
- `bestStreak`: Best win streak achieved

### Randomness

Uses Ethereum's PREVRANDAO opcode (block.prevrandao) combined with:
- Block timestamp
- Player address
- Player's game count

This provides sufficient randomness for a fun game while being gas-efficient.

## Deployment

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Add your private key to `.env`:
   ```
   PRIVATE_KEY=your_private_key_here
   ```

### Deploy to Celo Alfajores (Testnet)

Test deployment first:

```bash
npx hardhat run scripts/deploy.ts --network alfajores
```

Get testnet CELO from: https://faucet.celo.org/alfajores

### Deploy to Celo Mainnet

```bash
npx hardhat run scripts/deploy.ts --network celo
```

### Verify Contract

After deployment, verify on Celoscan:

```bash
npx hardhat verify --network celo <CONTRACT_ADDRESS>
```

### Update Frontend

After deployment, update `lib/contract-abi.ts`:

```typescript
export const CONTRACT_ADDRESS = "0xYourDeployedAddress" as `0x${string}`;
```

## Testing

Compile the contract:

```bash
npx hardhat compile
```

Run tests (if you create test files):

```bash
npx hardhat test
```

## Security Notes

⚠️ **This contract is for entertainment purposes only**

- No real money is wagered or won
- Randomness is suitable for games but not cryptographic security
- Player strategy is simplified (auto-hit until 17)
- No admin functions or upgradability

## Gas Estimates

Approximate gas costs on Celo:
- `playGame()`: ~150,000 - 250,000 gas (varies by hand size)
- `getStats()`: ~30,000 gas (view function, free when called off-chain)

With Celo's low gas prices, each game costs less than $0.01 USD.

## Support

For issues or questions:
- Check the main project README
- Review the Hardhat documentation: https://hardhat.org/docs
- Celo documentation: https://docs.celo.org
