import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { InputPaymentDto } from './payments.dto';
import { PaymentStatus } from '../../../node_modules/.prisma/client/payments';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(payment: InputPaymentDto) {
    return await this.prisma.payment.create({
      data: {
        value: payment.value,
        order_id: payment.orderId,
        customer_id: payment.customerId,
        status: PaymentStatus.ACCEPTED,
      },
    });
  }
}
