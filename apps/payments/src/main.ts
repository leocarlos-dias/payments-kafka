import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule, {
    logger: ['error'],
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: 'orders',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001, () => {
    console.log('⚡️ Payments service is up and running on port 3001');
  });
}
bootstrap();
