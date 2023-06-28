import { Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { InputOrderDto } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(input: InputOrderDto) {
    return await this.ordersService.create(input);
  }

  @Get()
  async getAll() {
    return await this.ordersService.getAll();
  }
}
