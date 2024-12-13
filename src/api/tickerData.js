const axios = require('axios');

// 특정 마켓의 가격 가져오기 함수
const getTickerData = async (markets) => {
    const server_url = "https://api.upbit.com";

    try {
        const response = await axios.get(`${server_url}/v1/ticker`, {
            params: { markets }, // 쿼리 파라미터 추가
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`HTTP ${error.response.status}: ${JSON.stringify(error.response.data)}`);
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};

module.exports = { getTickerData };
