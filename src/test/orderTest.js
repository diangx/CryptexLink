const { placeOrder } = require('../api/orderHandler');
require('dotenv').config(); // 환경 변수 로드

(async () => {
    try {
        // 테스트 주문 생성
        const orderResult = await placeOrder(
            'KRW-BTC',  // 마켓 이름
            'bid',      // 매수
            '0.01',     // 수량
            '100',      // 가격
            'limit'     // 주문 유형
        );

        console.log('Order placed successfully:', orderResult);
    } catch (error) {
        console.error('Error placing order:', error.message);
    }
})();
