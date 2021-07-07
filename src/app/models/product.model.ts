import { Entity } from './core/entity.model';

export class Product extends Entity {
  constructor(
    public title?: string,
    public description?: string,
    public price?: number,
    public image?: string,
    public quantity?: number
  ) {
    super();
  }
}