# 🎰 Blackjack on Celo - Farcaster Mini App

A full-featured Blackjack game built as a Farcaster mini-app with Celo blockchain integration. Play in Free Mode with virtual credits or On-Chain Mode where games are recorded on Celo Mainnet.

## ✨ Features

### Free Play Mode
- 🎮 Start with 1000 virtual credits
- 💰 Win credits: +10 for win, +15 for blackjack, -10 for loss
- 📊 Track your stats locally
- 🔄 Reset anytime to start fresh

### On-Chain Mode
- ⛓️ Games recorded on Celo blockchain
- 📈 Permanent statistics tracking
- 🎯 Win/loss streaks
- 🔐 Provably fair randomness (block.prevrandao)
- 💸 No real money - just for fun!

### Game Features
- ♠️ Standard Blackjack rules
- 🃏 Dealer hits on 16, stands on 17+
- 🎴 Ace counts as 1 or 11 (smart calculation)
- 🎨 Beautiful mobile-first UI
- 🌈 Glassmorphism design with Celo yellow branding
- 📱 Optimized for Farcaster mobile experience

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Blockchain**: Wagmi v2, Viem, Celo
- **Farcaster**: @farcaster/miniapp-sdk
- **Smart Contract**: Solidity 0.8.20, Hardhat

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet
- CELO tokens for on-chain mode

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd blackjack-farcaster
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 📝 Smart Contract Deployment

### Deploy to Celo Alfajores (Testnet)

1. Get testnet CELO from [Celo Faucet](https://faucet.celo.org/alfajores)

2. Add your private key to `.env`:
   ```
   PRIVATE_KEY=your_private_key_here
   ```

3. Deploy:
   ```bash
   npx hardhat run scripts/deploy.ts --network alfajores
   ```

### Deploy to Celo Mainnet

```bash
npx hardhat run scripts/deploy.ts --network celo
```

### Update Contract Address

After deployment, update `lib/contract-abi.ts`:
```typescript
export const CONTRACT_ADDRESS = "0xYourDeployedAddress" as `0x${string}`;
```

## 🎮 How to Play

### Free Mode
1. Click "Free Play" mode
2. Click "NEW GAME" to deal cards
3. Click "HIT" to draw another card or "STAND" to end your turn
4. Dealer plays automatically
5. Win credits and track your stats!

### On-Chain Mode
1. Connect your wallet
2. Switch to "On-Chain" mode
3. Click "PLAY ON-CHAIN" to record a game on Celo
4. Each game costs minimal gas (< $0.01)
5. Stats are permanently stored on-chain

## 🎯 Game Rules

- **Blackjack**: 21 with 2 cards = instant win (unless dealer also has 21)
- **Win**: Beat dealer without busting (going over 21)
- **Push**: Tie with dealer
- **Bust**: Go over 21 = automatic loss
- **Dealer**: Hits on 16 or less, stands on 17+
- **Ace**: Counts as 11 or 1 (whichever is better)

## 📂 Project Structure

```
blackjack-farcaster/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with Farcaster metadata
│   ├── page.tsx           # Main game page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BlackjackTable.tsx # Game table UI
│   ├── CardDisplay.tsx    # Individual card display
│   ├── Hands.tsx          # Player & dealer hands
│   ├── GameControls.tsx   # HIT/STAND/NEW GAME buttons
│   ├── GameStats.tsx      # Statistics display
│   ├── GameMessage.tsx    # Game messages (win/lose/etc)
│   ├── ModeToggle.tsx     # Free/On-Chain mode toggle
│   ├── WalletConnect.tsx  # Wallet connection UI
│   ├── FarcasterShare.tsx # Share to Farcaster
│   └── providers.tsx      # Wagmi & Farcaster providers
├── contracts/             # Smart contracts
│   ├── Blackjack.sol      # Main game contract
│   └── README.md          # Contract documentation
├── hooks/                 # React hooks
│   └── useBlackjack.ts    # Core game logic hook
├── lib/                   # Utilities
│   ├── wagmi.ts           # Wagmi configuration
│   ├── farcaster.ts       # Farcaster SDK helpers
│   ├── cards.ts           # Card types & utilities
│   ├── contract-abi.ts    # Contract ABI & address
│   └── utils.ts           # General utilities
├── scripts/               # Deployment scripts
│   └── deploy.ts          # Hardhat deployment script
└── hardhat.config.ts      # Hardhat configuration
```

## 🔑 Key Files Explained

- **hooks/useBlackjack.ts**: Contains all game logic including Ace calculation, dealer AI, and blockchain integration
- **contracts/Blackjack.sol**: Smart contract with game simulation and stats tracking
- **lib/wagmi.ts**: Blockchain connection config with Farcaster wallet support
- **components/providers.tsx**: Sets up Wagmi, React Query, and Farcaster SDK

## 🔧 Development

### Build for Production

```bash
npm run build
```

### Lint Code

```bash
npm run lint
```

### Compile Smart Contracts

```bash
npx hardhat compile
```

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables (if any)
4. Deploy!

### Farcaster Mini App Integration

The app includes Farcaster metadata in `app/layout.tsx`. After deployment:

1. Create an OG image at `/public/og-image.png` (1200x630px)
2. Update `NEXT_PUBLIC_APP_URL` in your deployment settings
3. Share your app URL in Farcaster!

## 🎨 Design

- **Color Scheme**: Celo Yellow (#FCFF52) + Dark theme
- **Layout**: Mobile-first responsive design
- **Effects**: Glassmorphism, smooth animations
- **Accessibility**: Reduced motion support, touch-friendly targets

## 📊 Smart Contract Details

### Functions

- `playGame()`: Play a complete Blackjack game (returns result)
- `getStats()`: Get player statistics (wins, losses, streaks, etc.)

### Events

- `GamePlayed`: Emitted after each game with full details

### Randomness

Uses Ethereum's PREVRANDAO (block.prevrandao) combined with:
- Block timestamp
- Player address
- Player's game count

Provides sufficient randomness for entertainment while being gas-efficient.

## 🔒 Security Notes

⚠️ **This is a fun game, not a gambling platform**

- No real money is wagered or won
- Smart contract has no withdraw/deposit functions
- Randomness is suitable for games but not cryptographic security
- Always verify contract address before interacting

## 🐛 Known Issues

- Contract deployment requires updating CONTRACT_ADDRESS manually
- On-chain mode requires CELO tokens for gas
- Stats don't sync between Free and On-Chain modes

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built for Farcaster ecosystem
- Powered by Celo blockchain
- Inspired by classic casino Blackjack

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the [contracts README](contracts/README.md) for deployment help
- Review [Celo docs](https://docs.celo.org) for blockchain questions

---

**Have fun and play responsibly! 🎰**
