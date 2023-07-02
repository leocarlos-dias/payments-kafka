import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule, {
    logger: ['error'],
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: 'orders-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000, () => {
    console.log('⚡️ Orders service is up and running on port 3000');
  });
}
bootstrap();
