import { Entity } from './core/entity.model';
import { Client } from './client';
import { OrderItem } from './order-item.model';

export class Order extends Entity {

  constructor(
    public clientId?: string,
    public date?: string,
    public amount?: number,
    public client: Client = new Client(),
    public orderItems: OrderItem[] = []
  ) {
    super();
  }
}