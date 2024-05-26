import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { IncomingOrder } from './types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createSolicitud(@Body() order: IncomingOrder) {
    await this.ordersService.create(order);
    return order;
  }
}
