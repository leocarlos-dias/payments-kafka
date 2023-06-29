import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { InputPaymentDto, OutputPaymentDto } from './payments.dto';
import { PaymentStatus } from '../../../node_modules/.prisma/client/payments';
import { OrderEventService } from './order-event.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private orderEventService: OrderEventService,
  ) {}

  async getAll() {
    return await this.prisma.payment.findMany();
  }

  async payment({
    customerId,
    orderId,
    price,
  }: InputPaymentDto): Promise<OutputPaymentDto> {
    const payment = await this.prisma.payment.create({
      data: {
        value: price,
        order_id: orderId,
        customer_id: customerId,
        status: PaymentStatus.ACCEPTED,
      },
    });
    await this.orderEventService.emitPaymentCreatedEvent(payment);
    return {
      paymentId: payment.id,
      orderId: payment.order_id,
      value: payment.value,
      customerId: payment.customer_id,
      createdAt: payment.created_at,
      status: payment.status,
    };
  }
}
