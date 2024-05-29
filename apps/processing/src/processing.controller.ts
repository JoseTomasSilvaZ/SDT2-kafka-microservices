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
    return this.processingService.processUpdateOrderStatus1(order);
  }

  @EventPattern('processing_order')
  handleOrderStatusChanged1(order: Order) {
    return this.processingService.processUpdateOrderStatus2(order);
  }

  @EventPattern('delivering_order')
  handleOrderStatusChanged2(order: Order) {
    return this.processingService.processUpdateOrderStatus3(order);
  }
}
