const calculateMovingAverage = (candles, period) => {
    if (candles.length < period) {
        throw new Error('Not enough data points for the given period');
    }

    const closingPrices = candles.map((candle) => candle.trade_price);
    const movingAverage = closingPrices
        .slice(0, period)
        .reduce((sum, price) => sum + price, 0) / period;

    return movingAverage;
};

const movingAverageStrategy = (candles, shortPeriod = 5, longPeriod = 20) => {
    const shortMA = calculateMovingAverage(candles, shortPeriod);
    const longMA = calculateMovingAverage(candles, longPeriod);

    if (shortMA > longMA) return 'BUY';
    if (shortMA < longMA) return 'SELL';
    return 'HOLD';
};

module.exports = { movingAverageStrategy };

