import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export class OrdersService {
  constructor(@Inject('ORDERS_SERVICE') private readonly client: ClientKafka) {}

  async create(order: any) {
    await this.client.emit('order_created', order);
    return order;
  }
}
