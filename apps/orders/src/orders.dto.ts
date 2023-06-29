import { OrderStatus } from '../../../node_modules/.prisma/client/orders';

export class InputOrderDto {
  price: number;
  customerId: number;
}

export class OutputOrderDto {
  orderId: number;
  price: number;
  customerId: number;
  createdAt: Date;
  status: OrderStatus;
}
export { OrderStatus };
