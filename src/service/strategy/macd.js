const calculateEMA = (prices, period) => {
    const multiplier = 2 / (period + 1);
    return prices.reduce((ema, price, index) => {
        if (index === 0) return price;
        return price * multiplier + ema * (1 - multiplier);
    });
};

const calculateMACD = (candles) => {
    const closingPrices = candles.map((candle) => candle.trade_price);
    const shortEMA = calculateEMA(closingPrices, 12);
    const longEMA = calculateEMA(closingPrices, 26);
    const macdLine = shortEMA - longEMA;
    const signalLine = calculateEMA([macdLine], 9);

    return { macdLine, signalLine };
};

const macdStrategy = (candles) => {
    const { macdLine, signalLine } = calculateMACD(candles);

    if (macdLine > signalLine) return 'BUY';
    if (macdLine < signalLine) return 'SELL';
    return 'HOLD';
};

module.exports = { macdStrategy };

