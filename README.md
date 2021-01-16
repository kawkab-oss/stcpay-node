# STCPay for Node

STC Pay direct payment implementation for Node.

## Installation
```sh
npm install stcpay-node
yarn add stcpay-node
```

## Usage
```ts
new STCPay({
  merchantId: YOUR_MERCHANT_ID,
  username: YOUR_USERNAME,
  password: YOUR_PASSWORD,
  testing: false
}).authorize(CUSTOMER_PHONE_NO, AMOUNT);
```