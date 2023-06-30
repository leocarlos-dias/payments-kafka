import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { InputOrderDto, InputPaymentDto, OutputOrderDto } from './orders.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderStatus } from '../../../node_modules/.prisma/client/orders';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() input: InputOrderDto): Promise<OutputOrderDto> {
    return await this.ordersService.create(input);
  }

  @Get()
  async getAll(): Promise<OutputOrderDto[]> {
    return await this.ordersService.getAll();
  }

  @MessagePattern('payments')
  async complete(@Payload() input: InputPaymentDto): Promise<void> {
    return await this.ordersService.done(input);
  }
}
