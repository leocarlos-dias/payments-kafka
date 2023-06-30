import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderEventService {
  constructor(@Inject('PAYMENTS_SERVICE') private kafkaProducer: ClientKafka) {}

  async emitPaymentCreatedEvent(order: any): Promise<void> {
    await lastValueFrom(this.kafkaProducer.emit('payments', order));
  }
}
