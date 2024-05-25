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

  process(order: any) {
    order.status = 'Processing';
    this.client.emit('unfinished_order', order);
  }
}
