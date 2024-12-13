const axios = require('axios');

// 마켓 데이터 가져오기 함수
const getMarketData = async () => {
    const options = {
        method: 'GET',
        url: 'https://api.upbit.com/v1/market/all',
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            is_details: true, // 쿼리 파라미터
        },
    };

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`HTTP ${error.response.status}: ${error.response.data}`);
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};

module.exports = { getMarketData };
