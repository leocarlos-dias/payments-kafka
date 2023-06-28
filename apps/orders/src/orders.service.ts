import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { InputOrderDto } from './orders.dto';
import { OrderStatus } from '../../../node_modules/.prisma/client/orders';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.order.findMany();
  }

  async create({ price, customerId }: InputOrderDto) {
    return await this.prisma.order.create({
      data: {
        price,
        customer_id: customerId,
        status: OrderStatus.PROCESSING,
      },
    });
  }
}
