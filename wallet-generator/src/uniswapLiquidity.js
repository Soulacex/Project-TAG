const { ethers } = require('ethers');
const { ChainId, Token, TokenAmount, Pair, Route, Trade, TradeType, Percent } = require('@uniswap/sdk');

const addLiquidityToUniswap = async (provider, wallet, tokenA, tokenB, amountA, amountB) => {
    const pair = await Pair.fetchData(tokenA, tokenB);
    const route = new Route([pair], tokenA);
    const trade = new Trade(route, new TokenAmount(tokenA, amountA), TradeType.EXACT_INPUT);

    const slippageTolerance = new Percent('50', '10000'); // 0.5%
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // Calculate minimum amount out
    const path = [tokenA.address, tokenB.address];
    const to = wallet.address; // Recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    const tx = await wallet.sendTransaction({
        to: UNISWAP_ROUTER_ADDRESS,
        data: router.interface.encodeFunctionData('addLiquidity', [path, amountA, amountB, amountOutMin, to, deadline]),
        value: ethers.utils.parseEther('0.1'), // Amount of ETH to send
    });

    await tx.wait();
    console.log(`Added liquidity to Uniswap pool: ${tokenA} and ${tokenB}`);
};

const main = async () => {
    const provider = new ethers.providers.InfuraProvider('mainnet', 'YOUR_INFURA_PROJECT_ID');
    const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
    const tokenA = new Token(ChainId.MAINNET, 'TOKEN_A_ADDRESS', 18);
    const tokenB = new Token(ChainId.MAINNET, 'TOKEN_B_ADDRESS', 18);
    const amountA = ethers.utils.parseUnits('100', 18); // Amount of token A
    const amountB = ethers.utils.parseUnits('100', 18); // Amount of token B

    await addLiquidityToUniswap(provider, wallet, tokenA, tokenB, amountA, amountB);
};

main().catch(console.error);
