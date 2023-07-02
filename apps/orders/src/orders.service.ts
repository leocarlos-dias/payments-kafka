import { Injectable } from '@nestjs/common';
import { InputOrderDto, InputPaymentDto, OutputOrderDto } from './orders.dto';
import { OrderEventService } from './order-event.service';
import { OrderStatus } from '.prisma/client/orders';
import { PrismaService } from './prisma/prisma.service';

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
    console.log(
      '🛒 Order Generated:',
      `#${order.id}`,
      '🔸 Price:',
      order.price,
      '👤 Customer:',
      order.customer_id,
      '🕒 Created At:',
      order.created_at,
      '📝 Status:',
      order.status,
    );
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
    console.log(`🛒 Order Update: Order ID #${orderId} 🔸 Status: ${status}`);
  }
}
