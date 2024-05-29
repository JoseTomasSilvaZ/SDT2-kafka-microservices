import { Controller } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { EventPattern } from '@nestjs/microservices';
import { Order } from '.prisma/client';

@Controller()
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @EventPattern('order_created')
  handleOrderCreated(order: Order) {
    console.log('Order created', order);
    return this.processingService.processUpdateOrderStatus(order);
  }

  @EventPattern(['processing_order', 'delivering_order'])
  handleOrderStatusChanged1(order: Order) {
    return this.processingService.processUpdateOrderStatus(order);
  }
}
