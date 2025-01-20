const axios = require('axios');
const uuidv4 = require("uuid").v4;
const sign = require('jsonwebtoken').sign;
require('dotenv').config();

// 계좌 정보 가져오기 함수
const getAccountInfo = async (req) => {
    const access_key = req.accessKey || process.env.UPBIT_OPEN_API_ACCESS_KEY;
    const secret_key = req.secretKey || process.env.UPBIT_OPEN_API_SECRET_KEY;
    const server_url = req.serverUrl || process.env.UPBIT_OPEN_API_SERVER_URL;

    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
    };

    const token = sign(payload, secret_key);

    const options = {
        method: "GET",
        url: `${server_url}/v1/accounts`,
        headers: { Authorization: `Bearer ${token}` },
    };

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        if (error.response) {
            // 서버가 응답한 에러 처리
            throw new Error(`HTTP ${error.response.status}: ${error.response.data}`);
        } else {
            // 네트워크 에러 또는 요청 설정 문제
            throw new Error(`Error: ${error.message}`);
        }
    }
};

module.exports = { getAccountInfo };
