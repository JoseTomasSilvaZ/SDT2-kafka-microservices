import { Order } from '@prisma/client';

export type IncomingOrder = Omit<
  Order,
  'id' | 'createdAt' | 'updatedAt' | 'status'
>;
