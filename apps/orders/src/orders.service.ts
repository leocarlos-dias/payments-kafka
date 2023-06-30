import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { InputOrderDto, InputPaymentDto, OutputOrderDto } from './orders.dto';
import { OrderStatus } from '../../../node_modules/.prisma/client/orders';
import { OrderEventService } from './order-event.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private orderEventService: OrderEventService,
  ) {}

  async getAll(): Promise<OutputOrderDto[]> {
    const orders = await this.prisma.order.findMany();
    return orders.map((order) => ({
      orderId: order.id,
      price: order.price,
      customerId: order.customer_id,
      createdAt: order.created_at,
      status: order.status,
    }));
  }

  async create({ price, customerId }: InputOrderDto): Promise<OutputOrderDto> {
    const order = await this.prisma.order.create({
      data: {
        price,
        customer_id: customerId,
        status: OrderStatus.PROCESSING,
      },
      select: {
        id: true,
        price: true,
        customer_id: true,
        created_at: true,
        status: true,
      },
    });
    await this.orderEventService.emitOrderCreatedEvent({
      orderId: order.id,
      price: order.price,
      customerId: order.customer_id,
    });
    return {
      orderId: order.id,
      price: order.price,
      customerId: order.customer_id,
      createdAt: order.created_at,
      status: order.status,
    };
  }

  async done({ status, orderId }: InputPaymentDto): Promise<void> {
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status:
          status === 'ACCEPTED' ? OrderStatus.PAYED : OrderStatus.CANCELLED,
      },
    });
  }
}
