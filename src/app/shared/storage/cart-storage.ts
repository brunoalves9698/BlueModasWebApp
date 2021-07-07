import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StorageBase } from './core/storage-base.storage';

@Injectable({
  providedIn: 'root'
})
export class CartStorage extends StorageBase<Product>{

  constructor() {
    super('blumodas.cart');
  }

}
