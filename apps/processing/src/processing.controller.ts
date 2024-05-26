import { Controller } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @EventPattern('order_created')
  handleOrderCreated(order: any) {
    return this.processingService.processCreatedOrder(order);
  }

  @EventPattern('order_status_changed')
  handleOrderStatusChanged(order: any) {
    return this.processingService.processUpdateOrderStatus(order);
  }
}
