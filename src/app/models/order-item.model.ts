import { Entity } from './core/entity.model';
import { Product } from './product.model';

export class OrderItem extends Entity {

  constructor(
    public orderId?: string,
    public productId?: string,
    public quantity?: number,
    public unitPrice?: number,
    public amount?: number,
    public product: Product = new Product()
  ) {
    super();
  }
}