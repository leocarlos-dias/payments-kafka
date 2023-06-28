import { Body, Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { InputPaymentDto } from './payments.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  create(@Body() input: InputPaymentDto) {
    return this.paymentsService.create(input);
  }
}
