# 🎰 Blackjack on Celo - Farcaster Mini App

A full-featured Blackjack game built as a Farcaster mini-app with Celo blockchain integration. Play in Free Mode with virtual credits or On-Chain Mode where games are recorded on Celo Mainnet.

🎮 **Live Demo**: [blackjack-farcaster.vercel.app](https://blackjack-farcaster.vercel.app)
⛓️ **Contract**: [0x6cb9971850767026feBCb4801c0b8a946F28C9Ec](https://celoscan.io/address/0x6cb9971850767026feBCb4801c0b8a946F28C9Ec) (Celo Mainnet)

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
- 🔄 Auto-switching to Celo network
- ⚡ Optimistic UI updates for fast gameplay
- 💪 Reliable transactions (120s timeout, explicit gas limits)

### Game Features
- ♠️ Standard Blackjack rules
- 🃏 Dealer hits on 16, stands on 17+
- 🎴 Ace counts as 1 or 11 (smart calculation)
- 🎨 Beautiful mobile-first UI with Solo-Jackpot visual signature
- 🌈 Glassmorphism design with gray gradients and yellow accents
- 📱 Optimized for Farcaster mobile experience (compact layout, no scrolling)
- 👛 Connected wallet display with address
- 🔁 One-click "PLAY AGAIN" button for on-chain games
- 🎯 Realistic card symbols (♠️♥️♦️♣️) with PNG assets

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
   cp .env.example .env.local
   ```

   Add the following to `.env.local`:
   ```env
   NEXT_PUBLIC_URL=http://localhost:3000
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

   Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 📝 Smart Contract

### Current Deployment

The contract is already deployed on **Celo Mainnet**:
- **Address**: `0x6cb9971850767026feBCb4801c0b8a946F28C9Ec`
- **Explorer**: [View on CeloScan](https://celoscan.io/address/0x6cb9971850767026feBCb4801c0b8a946F28C9Ec)
- **Network**: Celo (Chain ID: 42220)

### Deploy Your Own Contract

If you want to deploy your own version:

1. **For Testnet (Alfajores)**:
   ```bash
   # Get testnet CELO from https://faucet.celo.org/alfajores
   npx hardhat run scripts/deploy.ts --network alfajores
   ```

2. **For Mainnet**:
   ```bash
   npx hardhat run scripts/deploy.ts --network celo
   ```

3. **Update Contract Address**:
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

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. **Configure Vercel**:
   - Import project in [Vercel](https://vercel.com)
   - Add environment variables:
     - `NEXT_PUBLIC_URL`: Your deployed URL (e.g., `https://your-app.vercel.app`)
     - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Your WalletConnect Project ID
   - Deploy!

3. **Update After First Deploy**:
   After getting your Vercel URL, update `NEXT_PUBLIC_URL` in Vercel settings and redeploy.

### Farcaster Mini App Integration

The app is fully configured for Farcaster mini-apps:

#### Required Assets
All PNG assets are included in `/public/`:
- `icon.png` - App icon (512x512px)
- `og-image.png` - OpenGraph image for sharing (1200x630px)
- `splash.png` - Splash screen image

#### Manifest Configuration
The `public/manifest.json` defines the mini-app metadata with Solo-Jackpot branding.

#### Farcaster Redirect
The app includes a redirect configuration in `next.config.mjs` that points to the Farcaster hosted manifest. This is required for mini-app verification.

#### Metadata Setup
Farcaster metadata is configured in `app/layout.tsx` with:
- OpenGraph tags for rich previews
- `fc:miniapp` metadata for Farcaster integration
- Launch button configuration

#### Deploy to Farcaster

1. Ensure your app is deployed and accessible via HTTPS
2. The manifest redirect is automatically configured
3. Test your mini-app in Farcaster mobile
4. Share your app URL in Farcaster frames!

## 🎨 Design - Solo-Jackpot Visual Signature

- **Color Scheme**: Gray gradients with yellow accents (#FCFF52)
- **Visual Style**: Glassmorphism with backdrop blur effects
- **Layout**: Mobile-first responsive design optimized for Farcaster
- **Effects**: Smooth animations, realistic card symbols
- **Typography**: Clean, modern font with proper hierarchy
- **Accessibility**: Reduced motion support, touch-friendly targets (44px minimum)
- **Cards**: PNG assets with realistic ♠️♥️♦️♣️ symbols
- **Compact Mode**: Optimized layout for mobile viewports with minimal scrolling

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

## ✅ Recent Improvements

- ✅ **Transaction Reliability**: 120-second timeout with explicit gas limits (500,000)
- ✅ **Network Auto-Switching**: Automatically switches to Celo when user is on Ethereum
- ✅ **Optimistic Updates**: Fast UI feedback with 300ms delays between actions
- ✅ **Mobile Optimization**: Compact layout removes scrolling in Farcaster mobile
- ✅ **Connected Wallet Display**: Shows connected address with green indicator
- ✅ **Play Again Button**: One-click replay for on-chain games
- ✅ **PNG Image Migration**: All assets migrated from SVG to PNG for better compatibility
- ✅ **Error Handling**: Improved error messages and recovery options

## 🐛 Known Issues & Considerations

- Contract deployment requires updating `CONTRACT_ADDRESS` in `lib/contract-abi.ts`
- On-chain mode requires CELO tokens for gas (~$0.01 per game)
- Stats don't sync between Free and On-Chain modes (by design)
- First wallet connection may take longer on mobile

## 🚀 Creating a New Mini-App Based on This Project

This project serves as a great template for building Farcaster mini-apps with blockchain integration. Here's how to create your own:

### 1. Clone and Rename

```bash
git clone https://github.com/PhilV2dot1/blackjack-farcaster.git my-new-miniapp
cd my-new-miniapp
rm -rf .git
git init
```

### 2. Update Package.json

Change the `name`, `description`, and other metadata in `package.json`.

### 3. Modify Smart Contract

1. Edit `contracts/YourContract.sol` with your game logic
2. Update contract ABI and address in `lib/contract-abi.ts`
3. Deploy to Celo:
   ```bash
   npx hardhat run scripts/deploy.ts --network celo
   ```

### 4. Update UI Components

- Replace game logic in `hooks/useBlackjack.ts` (or create your own hook)
- Modify components in `components/` folder
- Update styles to match your theme (keep Solo-Jackpot signature or create your own)

### 5. Update Assets

Generate new PNG images (512x512, 1200x630):
- `public/icon.png` - Your app icon
- `public/og-image.png` - Social sharing image
- `public/splash.png` - Splash screen

### 6. Configure Farcaster

1. Update metadata in `app/layout.tsx`:
   - Title, description
   - Button text and action
2. Update `public/manifest.json` with your app details
3. Get a new Farcaster manifest URL and update redirect in `next.config.mjs`

### 7. Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_URL=your-vercel-url
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

### 8. Deploy

```bash
git add .
git commit -m "Initial commit for my new mini-app"
git remote add origin your-github-repo
git push -u origin master
```

Then deploy to Vercel and configure environment variables.

### Key Files to Modify

- `contracts/` - Your smart contract logic
- `hooks/` - Game/app logic
- `components/` - UI components
- `app/layout.tsx` - Metadata and SEO
- `public/manifest.json` - Farcaster manifest
- `lib/contract-abi.ts` - Contract interface
- `next.config.mjs` - Farcaster redirect

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
