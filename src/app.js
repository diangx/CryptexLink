const express = require('express');
const cors = require('cors');
const { getAccountInfo } = require('./api/accountHandler');
const { getMarketData } = require('./api/marketData');
const { getTickerData } = require('./api/tickerData');
const { getCandles } = require('./api/candles');
const { placeOrder } = require('./api/orderHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정
app.use(cors());

// JSON 요청 본문을 파싱하기 위한 미들웨어 추가
app.use(express.json());

// 기본 경로
app.get('/', (req, res) => {
    res.send('Upbit Bot API is running');
});

// 계좌 정보
/*
    curl "http://localhost:3000/api/account"
*/
app.get('/api/account', async (req, res) => {
    try {
        const accountInfo = await getAccountInfo();
        res.json(accountInfo);
    } catch (error) {
        console.error('Error fetching account info:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 마켓 상태
/* 
    curl "http://localhost:3000/api/markets"
    curl "http://localhost:3000/api/markets?currency=BTC"
*/
app.get('/api/markets', async (req, res) => {
    try {
        const { currency } = req.query; // 쿼리 파라미터로 필터 조건 받기
        const marketData = await getMarketData();

        // 쿼리 파라미터로 필터링 (예: currency=BTC)
        const filteredData = currency
            ? marketData.filter((market) => market.market.startsWith(`${currency}-`))
            : marketData;

        res.json(filteredData); // 필터링된 결과 반환
    } catch (error) {
        console.error('Error fetching market data:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 마켓 가격
/* 
    curl "http://localhost:3000/api/ticker?markets=KRW-ETH,KRW-BTC"
*/
app.get('/api/ticker', async (req, res) => {
    try {
        const { markets } = req.query; // 쿼리 파라미터에서 'markets' 가져오기
        if (!markets) {
            return res.status(400).json({ error: "Missing 'markets' query parameter" });
        }

        const tickerData = await getTickerData(markets);
        res.json(tickerData);
    } catch (error) {
        console.error('Error fetching ticker data:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 캔들 데이터
// 1, 3, 5, 15, 10, 30, 60, 240 - minutes
/*
    curl "http://localhost:3000/api/candles?timeframe=seconds&market=KRW-BTC&count=1"
    curl "http://localhost:3000/api/candles?timeframe=minutes/3&market=KRW-BTC&count=10"
    curl "http://localhost:3000/api/candles?timeframe=minutes/5&market=KRW-BTC&count=5"
    curl "http://localhost:3000/api/candles?timeframe=days&market=KRW-BTC&count=10"
    curl "http://localhost:3000/api/candles?timeframe=weeks&market=KRW-BTC&count=4"
    curl "http://localhost:3000/api/candles?timeframe=months&market=KRW-BTC&count=12"
*/
app.get('/api/candles', async (req, res) => {
    try {
        const { timeframe, market, count } = req.query; // 쿼리 파라미터에서 타임프레임, 마켓, 개수 가져오기
        if (!timeframe || !market) {
            return res.status(400).json({ error: "Missing 'timeframe' or 'market' query parameter" });
        }

        const candles = await getCandles(timeframe, market, count);
        res.json(candles); // 캔들 데이터 반환
    } catch (error) {
        console.error('Error fetching candles:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 주문
/*
    curl -X POST http://localhost:3000/api/order \
    -H "Content-Type: application/json" \
    -d '{
        "market": "KRW-BTC",
        "side": "bid",
        "volume": "0.01",
        "price": "100",
        "ord_type": "limit"
    }'
*/
app.post('/api/order', async (req, res) => {
    const { market, side, volume, price, ord_type } = req.body;

    if (!market || !side || !ord_type) {
        return res.status(400).json({
            error: 'Required fields: market, side, ord_type. Optional: volume, price.',
        });
    }

    try {
        const orderResult = await placeOrder(market, side, volume, price, ord_type);
        res.status(201).json(orderResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
