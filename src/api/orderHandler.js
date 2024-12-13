const axios = require('axios');
const uuidv4 = require("uuid").v4;
const crypto = require('crypto');
const sign = require('jsonwebtoken').sign;
const queryEncode = require("querystring").encode;

// 환경 변수에서 API 키 정보 가져오기
require('dotenv').config(); // .env 파일 로드
const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

/**
 * 주문 생성 함수
 * @param {string} market - 마켓 이름 (예: KRW-BTC)
 * @param {string} side - 주문 방향 ('bid' 또는 'ask')
 * @param {string} volume - 주문 수량 (매수의 경우 null 가능)
 * @param {string} price - 주문 가격 (매도의 경우 null 가능)
 * @param {string} ord_type - 주문 유형 ('limit', 'price', 'market')
 * @returns {Promise<Object>} - 주문 결과
 */
const placeOrder = async (market, side, volume, price, ord_type) => {
    try {
        // 주문 데이터
        const body = { market, side, volume, price, ord_type };
        const query = queryEncode(body);

        // SHA512 해싱
        const hash = crypto.createHash('sha512');
        const queryHash = hash.update(query, 'utf-8').digest('hex');

        // JWT 페이로드 생성
        const payload = {
            access_key,
            nonce: uuidv4(),
            query_hash: queryHash,
            query_hash_alg: 'SHA512',
        };

        if (!secret_key) {
            throw new Error('Secret key is missing. Check your environment variables.');
        }

        // JWT 토큰 생성
        const token = sign(payload, secret_key);

        // API 요청
        const response = await axios.post(`${server_url}/v1/orders`, body, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data; // 성공적으로 반환된 데이터
    } catch (error) {
        if (error.response) {
            // API에서 반환된 에러 처리
            throw new Error(
                `HTTP ${error.response.status}: ${JSON.stringify(error.response.data)}`
            );
        } else {
            // 네트워크 에러 또는 기타 에러
            throw new Error(`Request failed: ${error.message}`);
        }
    }
};

module.exports = { placeOrder };
