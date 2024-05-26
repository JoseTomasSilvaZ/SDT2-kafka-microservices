import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: 'orders-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
