import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderEventService } from './order-event.service';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'PAYMENTS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payments',
            brokers: ['kafka:29092'],
          },
        },
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, OrderEventService],
})
export class PaymentsModule {}
