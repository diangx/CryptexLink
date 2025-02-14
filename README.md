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
node src/app.js
```

## API Endpoints

### Get Market Data

**GET** `/api/market`

- Response:

```json
{
  "market": "KRW-BTC",
  "price": 75000000,
  "volume": 120.5
}
```

### Place an Order

**POST** `/api/order`

- Request:

```json
{
  "market": "KRW-BTC",
  "side": "buy",
  "volume": 0.1,
  "price": 75000000
}
```

- Response:

```json
{
  "order_id": "123456",
  "status": "pending"
}
```

# Reference

https://docs.upbit.com/
