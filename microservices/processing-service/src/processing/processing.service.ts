import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProcessingService implements OnModuleInit {
  constructor(
    @Inject('PROCESSING_SERVICE') private readonly client: ClientKafka,
  ) {}
  async onModuleInit() {
    this.client.subscribeToResponseOf('order_created');
    await this.client.connect();
    console.log('connected');
  }

  processCreatedOrder(order: any) {
    order.status = 1;
    this.client.emit('order_status_changed', order);
  }

  async processUpdateOrderStatus(order: any) {
    if (order.status === 4) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    order.status += 1;
    this.client.emit('order_status_changed', order);
  }
}
