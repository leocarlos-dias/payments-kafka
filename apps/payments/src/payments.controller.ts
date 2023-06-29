import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { InputPaymentDto } from './payments.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getAll() {
    return this.paymentsService.getAll();
  }

  @MessagePattern('orders')
  async payment(@Payload() input: InputPaymentDto) {
    return this.paymentsService.payment(input);
  }
}
