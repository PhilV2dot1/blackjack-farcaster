import { ethers } from "hardhat";

async function main() {
  console.log("🎰 Deploying Blackjack contract to Celo...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "CELO\n");

  // Deploy Blackjack contract
  const Blackjack = await ethers.getContractFactory("Blackjack");
  console.log("Deploying Blackjack contract...");

  const blackjack = await Blackjack.deploy();
  await blackjack.waitForDeployment();

  const address = await blackjack.getAddress();
  console.log("✅ Blackjack deployed to:", address);
  console.log("\n📝 Next steps:");
  console.log("1. Update lib/contract-abi.ts with the contract address:");
  console.log(`   export const CONTRACT_ADDRESS = "${address}" as \`0x\${string}\`;`);
  console.log("\n2. Verify the contract on Celoscan (optional):");
  console.log(`   npx hardhat verify --network celo ${address}`);
  console.log("\n3. Test a game by calling playGame()");
  console.log(`   The contract is now live at: https://celoscan.io/address/${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
