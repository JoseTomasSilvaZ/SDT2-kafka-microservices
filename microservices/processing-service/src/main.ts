import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProcessingModule } from './processing/processing.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProcessingModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9094'],
        },
        consumer: {
          groupId: 'processing-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
