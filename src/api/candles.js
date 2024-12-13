const axios = require('axios');

// 캔들 데이터 가져오기 함수
const getCandles = async (timeframe, market, count = 1) => {
    const server_url = "https://api.upbit.com";
    const options = {
        method: "GET",
        url: `${server_url}/v1/candles/${timeframe}`, // 타임프레임 추가
        headers: { accept: "application/json" },
        params: { market, count }, // 올바른 파라미터 전달
    };

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`HTTP ${error.response.status}: ${JSON.stringify(error.response.data)}`);
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};

module.exports = { getCandles };
