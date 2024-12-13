const axios = require('axios');

/**
 * 캔들 데이터 가져오기
 * @param {string} timeframe - 캔들 타임프레임 (seconds, minutes/1, days, weeks, months 등)
 * @param {string} market - 마켓 이름 (예: KRW-BTC)
 * @param {number} count - 가져올 캔들 데이터 수
 * @param {string} to - 기준 날짜 및 시간 (ISO 8601 형식: YYYY-MM-DDTHH:mm:ss)
 * @returns {Array} 캔들 데이터 배열
 */
const fetchCandles = async (timeframe, market, count, to) => {
    try {
        const params = { timeframe, market, count };
        if (to) {
            params.to = to; // 기준 날짜 및 시간 추가
        }

        const response = await axios.get('http://localhost:3000/api/candles', { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching candles: ${error.message}`);
        throw error;
    }
};

module.exports = { fetchCandles };
