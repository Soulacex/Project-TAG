const { Keypair } = require('@solana/web3.js');
const ethers = require('ethers');
const XLSX = require('xlsx');

// Function to generate multiple Solana and Ethereum wallets
const createMultipleWallets = (numWallets = 1000) => {
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

// Function to export wallets to an Excel file.
const exportToExcel = (wallets) => {
    const worksheet = XLSX.utils.json_to_sheet(wallets.map(wallet => ({
        'Solana Address': wallet.solana.address,
        'Solana Secret Key': wallet.solana.secretKey,
        'Ethereum Address': wallet.ethereum.address,
        'Ethereum Private Key': wallet.ethereum.privateKey,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Wallets');

    // Write to an Excel file.
    XLSX.writeFile(workbook, 'docs/wallets/wallets.xlsx');
};

// 1000 paired Solana and Ethereum wallets.
const wallets = createMultipleWallets();

// Export the wallets to an Excel file.
exportToExcel(wallets);

// Log the wallets.
console.log(JSON.stringify(wallets, null, 2));

