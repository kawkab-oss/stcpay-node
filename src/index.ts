import axios, { AxiosInstance, AxiosPromise } from 'axios';

interface STCPayConfig {
  merchantId: number;
  username: string;
  password: string;
  testing: boolean;
}

interface AuthorizationExtras {
  BranchID: string;
  TellerID: string;
  DeviceID: string;
  RefNum: string;
  BillNumber: string;
  MerchantNote: string;
}

interface AuthorizationResponse {
  OtpReference: string;
  STCPayPmtReference: string;
  ExpiryDuration: number;
}

interface ConfirmationResponse {
  MerchantID: string;
  BranchID: string;
  TellerID: string;
  DeviceID: string;
  RefNum: string;
  STCPayRefNum: string;
  TokenId: string;
  Amount: number;
  PaymentDate: string;
  PaymentStatus: number;
  PaymentStatusDesc: string;
}

export default class STCPay {
  private baseUrl = {
    testing: 'https://b2btest.stcpay.com.sa/B2B.DirectPayment.WebApi/DirectPayment/V4/',
    production: 'https://b2b.stcpay.com.sa/B2B.DirectPayment.WebApi/DirectPayment/V4/',
  };
  private axiosInstance: AxiosInstance;

  constructor(private config: STCPayConfig) {
    this.axiosInstance = axios.create({
      method: 'POST',
      baseURL: this.baseUrl[this.config.testing ? 'testing' : 'production'],
      headers: {
        'X-ClientCode': this.config.merchantId,
        'X-UserName': this.config.username,
        'X-Password': this.config.password
      },
    });
  }

  private request(location: string, data: { [prop: string]: any }): AxiosPromise<any> {
    return this.axiosInstance(location, {
      data,
    });
  }

  authorize(mobileNumber: string, amount: number, extras?: AuthorizationExtras): Promise<AuthorizationResponse> {
    return this.request('DirectPaymentAuthorize', {
      DirectPaymentAuthorizeV4RequestMessage: {
        MobileNo: mobileNumber,
        Amount: amount,
        ...extras,
      },
    }).then((res) => res.data.DirectPaymentAuthorizeV4ResponseMessage);
  }

  confirm(paymentReference: string, otpReference: string, otpValue: number): Promise<ConfirmationResponse> {
    return this.request('DirectPaymentConfirm', {
      DirectPaymentConfirmV4RequestMessage: {
        STCPayPmtReference: paymentReference,
        OtpReference: otpReference,
        OtpValue: otpValue,
      },
    }).then((res) => res.data.DirectPaymentConfirmV4ResponseMessage);
  }
}