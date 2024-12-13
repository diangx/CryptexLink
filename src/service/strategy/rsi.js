const calculateRSI = (candles, period = 14) => {
    if (candles.length < period) {
        throw new Error('Not enough data points for the given period');
    }

    const closingPrices = candles.map((candle) => candle.trade_price);
    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
        const change = closingPrices[i] - closingPrices[i - 1];
        if (change > 0) gains += change;
        else losses -= change;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
};

const rsiStrategy = (candles, period = 14) => {
    const rsi = calculateRSI(candles, period);

    if (rsi < 30) return 'BUY';
    if (rsi > 70) return 'SELL';
    return 'HOLD';
};

module.exports = { rsiStrategy };

