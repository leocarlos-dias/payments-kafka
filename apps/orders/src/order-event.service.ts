import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderEventService {
  constructor(@Inject('ORDERS_SERVICE') private kafkaProducer: ClientKafka) {}

  async emitOrderCreatedEvent(order: any): Promise<void> {
    await lastValueFrom(this.kafkaProducer.emit('orders', order));
  }
}
