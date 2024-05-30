import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProcessingController } from './processing.controller';
import { ProcessingService } from './processing.service';
import { PrismaModule } from '@app/prisma';
import { ConfigModule } from '@nestjs/config';
import { PartitionAssigners } from 'kafkajs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    PrismaModule,
    ClientsModule.register([
      {
        name: 'PROCESSING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER],
            clientId: 'processing',
          },
          consumer: {
            groupId: 'processing-consumer',
            partitionAssigners: [PartitionAssigners.roundRobin],
          },
        },
      },
    ]),
  ],
  controllers: [ProcessingController],
  providers: [ProcessingService],
})
export class ProcessingModule {}
