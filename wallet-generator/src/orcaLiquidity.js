const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { Orca, Network } = require('@orca-so/sdk');

const addLiquidityToOrca = async (wallet, tokenA, tokenB, amountA, amountB) => {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const orca = Orca.getOrca(connection, Network.MAINNET);

    const pool = orca.getPool(tokenA, tokenB);
    const tx = await pool.addLiquidity(wallet, amountA, amountB);
    await tx.confirm();
    console.log(`Added liquidity to Orca pool: ${tokenA} and ${tokenB}`);
};

// Example usage
const main = async () => {
    const wallet = Keypair.generate();
    const tokenA = 'TOKEN_A_MINT_ADDRESS';
    const tokenB = 'TOKEN_B_MINT_ADDRESS';
    const amountA = 100; // Amount of token A
    const amountB = 100; // Amount of token B

    await addLiquidityToOrca(wallet, tokenA, tokenB, amountA, amountB);
};

main().catch(console.error);
