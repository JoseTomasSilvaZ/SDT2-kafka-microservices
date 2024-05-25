import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProcessingController } from './processing.controller';
import { ProcessingService } from './processing.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROCESSING_SERVICE',
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
    ]),
  ],
  controllers: [ProcessingController],
  providers: [ProcessingService],
})
export class ProcessingModule {}
