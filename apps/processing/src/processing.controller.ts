import { Controller } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { EventPattern } from '@nestjs/microservices';
import { Order } from '.prisma/client';

@Controller()
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @EventPattern('order_created')
  handleOrderCreated(order: Order) {
    return this.processingService.processCreatedOrder(order);
  }

  @EventPattern('order_status_changed')
  handleOrderStatusChanged(order: Order) {
    return this.processingService.processUpdateOrderStatus(order);
  }
}
