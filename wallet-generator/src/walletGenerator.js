const { Keypair } = require('@solana/web3.js');
const ethers = require('ethers');

// Function to generate multiple Solana and Ethereum wallets
const createMultipleWallets = (numWallets) => {
    const wallets = [];

    for (let i = 0; i < numWallets; i++) {
        // Create Solana wallet
        const solanaWallet = Keypair.generate();
        const solanaAddress = solanaWallet.publicKey.toString();
        const solanaSecretKey = Buffer.from(solanaWallet.secretKey).toString('hex');

        // Create Ethereum wallet
        const ethWallet = ethers.Wallet.createRandom();
        const ethAddress = ethWallet.address;
        const ethPrivateKey = ethWallet.privateKey;

        wallets.push({
            solana: {
                address: solanaAddress,
                secretKey: solanaSecretKey,
            },
            ethereum: {
                address: ethAddress,
                privateKey: ethPrivateKey,
            },
        });
    }

    return wallets;
};

// Example: Generate 5 paired Solana and Ethereum wallets
const wallets = createMultipleWallets(500);

// Log the wallets
console.log(JSON.stringify(wallets, null, 2));

