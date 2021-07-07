import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartStorage } from 'src/app/shared/storage/cart-storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private cartStorage: CartStorage
  ) { }

  public getQuntityInCart(): number {
    let productsInCart: Product[] = this.cartStorage.getAll();
    return productsInCart.length;
  }

}
