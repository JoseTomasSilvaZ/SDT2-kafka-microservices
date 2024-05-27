import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IncomingOrder } from './types';
import { PrismaModule, PrismaService } from '@app/prisma';

export class OrdersService {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly client: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}

  async create(order: IncomingOrder) {
    await this.prisma.order.create({
      data: order,
    });
    await this.client.emit('order_created', order);
    return order;
  }
}
