import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from './core/service-base.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ServiceBase<Product> {

  constructor(protected injector: Injector) {
    super('v1/products', injector);
  }

}
