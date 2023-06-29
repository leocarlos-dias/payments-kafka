import { OrderStatus } from 'apps/orders/src/orders.dto';
import { PaymentStatus } from '../../../node_modules/.prisma/client/payments';

export class InputPaymentDto {
  orderId: number;
  price: number;
  customerId: number;
  createdAt: Date;
  status: OrderStatus;
}

export class OutputPaymentDto {
  paymentId: number;
  orderId: number;
  value: number;
  customerId: number;
  createdAt: Date;
  status: PaymentStatus;
}
