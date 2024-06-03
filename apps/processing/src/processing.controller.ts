import { Controller } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { EventPattern } from '@nestjs/microservices';
import { Order } from '.prisma/client';

@Controller()
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @EventPattern(['order_created', 'processing_order', 'delivering_order'])
  async handleUpdateOrderStatus(order: Order) {
    return await this.processingService.processUpdateOrderStatus(order);
  }
}
