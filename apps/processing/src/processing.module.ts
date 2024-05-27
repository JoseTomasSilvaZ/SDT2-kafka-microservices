import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProcessingController } from './processing.controller';
import { ProcessingService } from './processing.service';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'PROCESSING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9094'],
            clientId: 'processing',
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
