import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications.module';
import { NotificationsRestModule } from './rest/rest.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsRestModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9094'],
        clientId: 'notifications',
      },
      consumer: {
        groupId: 'notifications-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
