const { fetchCandles } = require('./fetchCandles');
const { movingAverageStrategy } = require('../service/strategy/movingAverage');
const { rsiStrategy } = require('../service/strategy/rsi');
const { macdStrategy } = require('../service/strategy/macd');

/**
 * 필요한 데이터 개수 계산
 * @returns {number} 필요한 최소 데이터 개수
 */
const calculateRequiredDataCount = () => {
    const movingAverageRequirement = 20; // 이동평균선: longPeriod
    const rsiRequirement = 14; // RSI 기본값
    const macdRequirement = 26; // MACD 기본값
    return Math.max(movingAverageRequirement, rsiRequirement, macdRequirement);
};

/**
 * 전략 실행 및 결과 출력
 * @param {Array} candles - 캔들 데이터
 */
const runStrategies = (candles) => {
    try {
        console.log('-result-')
        console.log('Moving Average Strategy:', movingAverageStrategy(candles, 5, 20));
        console.log('RSI Strategy:', rsiStrategy(candles, 14));
        console.log('MACD Strategy:', macdStrategy(candles));
    } catch (error) {
        console.error('Error in strategy execution:', error.message);
    }
};

/**
 * API 요청 및 전략 테스트
 * @param {string} timeframe - 캔들 타임프레임
 * @param {string} market - 마켓 이름
 * @param {number} count - 캔들 데이터 개수
 * @param {string} to - 기준 날짜 및 시간 (ISO 8601 형식: YYYY-MM-DDTHH:mm:ss)
 */
const testStrategies = async (timeframe, market, count, to) => {
    console.log(`\nTesting ${timeframe} candles for market ${market} with ${count} data points...`);
    if (to) {
        console.log(`Using end time: ${to}`);
    }
    try {
        const requiredCount = calculateRequiredDataCount();
        if (count < requiredCount) {
            console.warn(`Not enough data points requested (${count}). Minimum required: ${requiredCount}. Adjusting...`);
            count = requiredCount; // 요구량에 맞게 조정
        }

        const candles = await fetchCandles(timeframe, market, count, to);
        console.log(`Fetched ${candles.length} candles`);
        if (candles.length < requiredCount) {
            throw new Error(`Fetched data is still insufficient. Required: ${requiredCount}, Received: ${candles.length}`);
        }
        runStrategies(candles);
    } catch (error) {
        console.error('Error in fetching or testing:', error.message);
    }
};

// 유동적인 요청 및 테스트 실행
(async () => {
    const tests = [
        // { timeframe: 'seconds', market: 'KRW-BTC', count: 10, to: '2024-12-13T10:00:00' },
        // { timeframe: 'minutes/5', market: 'KRW-ETH', count: 20, to: '2024-12-12T15:30:00' },
        // { timeframe: 'days', market: 'KRW-BTC', count: 5, to: '2024-12-01T00:00:00' },
        { timeframe: 'seconds', market: 'KRW-ETH', count: 200, to: null },
        { timeframe: 'minutes/1', market: 'KRW-ETH', count: 26, to: null },
        // { timeframe: 'months', market: 'KRW-ETH', count: 12, to: '2024-01-01T00:00:00' },
    ];

    for (const test of tests) {
        await testStrategies(test.timeframe, test.market, test.count, test.to);
    }
})();
