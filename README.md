# STC Pay Node.js SDK

STC Pay direct payment implementation for Node.

## Installation
```sh
npm install @kawkab-oss/stcpay-node
yarn add @kawkab-oss/stcpay-node
```

## Usage
```ts
const stcpay = new STCPay({
  merchantId: YOUR_MERCHANT_ID,
  cert: readFileSync('cert.pem', 'utf8'),
  key: readFileSync('key.pem', 'utf8'),
  testing: true
});

const response = await stcpay.authorize(CUSTOMER_PHONE_NUMBER, PAYMENT_AMOUNT, {
  BranchID: 'string',
  TellerID: 'string',
  DeviceID: 'string',
  RefNum: 'string',
  BillNumber: 'string'
});

await stcpay.confirm(response.STCPayPmtReference, response.OtpReference, OTP_FROM_CUSTOMER);
```