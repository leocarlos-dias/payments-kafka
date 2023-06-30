import { PaymentStatus } from '../../../node_modules/.prisma/client/payments';

export class InputPaymentDto {
  orderId: number;
  price: number;
  customerId: number;
}

export class OutputPaymentDto {
  paymentId: number;
  orderId: number;
  value: number;
  customerId: number;
  createdAt: Date;
  status: PaymentStatus;
}
