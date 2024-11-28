const { ethers } = require('ethers');
const { Curve } = require('@curvefi/sdk');

const addLiquidityToCurve = async (provider, wallet, poolAddress, amounts) => {
    const curve = new Curve(provider);
    const pool = await curve.getPool(poolAddress);

    const tx = await pool.addLiquidity(wallet, amounts);
    await tx.wait();
    console.log(`Added liquidity to Curve pool: ${poolAddress}`);
};

const main = async () => {
    const provider = new ethers.providers.InfuraProvider('arbitrum', 'YOUR_INFURA_PROJECT_ID');
    const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
    const poolAddress = '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // Example: USDC/DAI pool
    const amounts = [
        ethers.utils.parseUnits('100', 6), // Amount of USDC to add
        ethers.utils.parseUnits('100', 18) // Amount of DAI to add
    ]; 

    await addLiquidityToCurve(provider, wallet, poolAddress, amounts);
};

main().catch(console.error);
