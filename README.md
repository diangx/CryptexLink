# CryptexLink

CryptexLink is a backend server built using the Upbit API, designed to facilitate cryptocurrency trading and data retrieval.

## Features
- Fetch real-time market data from Upbit
- Execute cryptocurrency trades
- Manage API authentication and security
- Provide a structured JSON API for client applications

## Installation

### Prerequisites
- Node.js (latest LTS recommended)
- npm or yarn

### Setup
```sh
git clone https://github.com/diangx/CryptexLink.git
cd CryptexLink
npm install
```

## Configuration
1. Create a `.env` file in the project root and add your Upbit API credentials:
```sh
UPBIT_ACCESS_KEY=your_access_key
UPBIT_SECRET_KEY=your_secret_key
```
2. Start the server:
```sh
npm start
```

## API Endpoints

### Get Market Data
**GET** `/api/markets`
- Query Parameters:
  - `currency` (optional): Filter markets by currency (e.g., `BTC`)
- Example:
```sh
curl "http://localhost:3000/api/markets"
curl "http://localhost:3000/api/markets?currency=BTC"
```

### Get Account Info
**GET** `/api/account`
- Query Parameters:
  - `key` (required): API key
- Example:
```sh
curl "http://localhost:3000/api/account?key=your_key"
```

### Get Ticker Data
**GET** `/api/ticker`
- Query Parameters:
  - `markets` (required): Comma-separated list of markets (e.g., `KRW-ETH,KRW-BTC`)
- Example:
```sh
curl "http://localhost:3000/api/ticker?markets=KRW-ETH,KRW-BTC"
```

### Get Candle Data
**GET** `/api/candles`
- Query Parameters:
  - `timeframe` (required): Time interval (`seconds`, `minutes/X`, `days`, `weeks`, `months`)
  - `market` (required): Market symbol (e.g., `KRW-BTC`)
  - `count` (optional): Number of records to retrieve
- Example:
```sh
curl "http://localhost:3000/api/candles?timeframe=minutes/5&market=KRW-BTC&count=5"
```

### Place an Order
**POST** `/api/order`
- Request Body:
```json
{
  "market": "KRW-BTC",
  "side": "bid",
  "volume": "0.01",
  "price": "100",
  "ord_type": "limit"
}
```
- Example:
```sh
curl -X POST http://localhost:3000/api/order \
-H "Content-Type: application/json" \
-d '{
    "market": "KRW-BTC",
    "side": "bid",
    "volume": "0.01",
    "price": "100",
    "ord_type": "limit"
}'
```

# Reference

https://docs.upbit.com/
