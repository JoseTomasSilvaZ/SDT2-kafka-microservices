// main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'orders',
        brokers: [`${process.env.KAFKA_BROKER}`],
      },
      producerOnlyMode: true,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
