import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CartStorage } from 'src/app/shared/storage/cart-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];
  public isBusy = true;

  constructor(
    private cartStorage: CartStorage,
    private productService: ProductService
  ) {
    // this.cartStorage.deleteAll();
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.isBusy = true;
    this.productService.getAll().then(async (response: Product[]) => {
      this.products = response;

      this.products.map((product: Product) => {
        product.quantity = 1;
      });

      this.isBusy = false;
    }, async (error: any) => {
      this.isBusy = false;
      alert('Erro ao carregar produtos');
    });
  }

  public alreadyHasInCart(product: Product): boolean {
    let productsInCart: Product[] = this.cartStorage.getAll();
    let hasProduct = productsInCart.find(item => { return item.id == product.id });

    if (hasProduct)
      return true;
    else
      return false;
  }

  public addToCart(product: Product) {
    this.cartStorage.insertItem(product);
  }

  public removeFromCart(product: Product) {
    this.cartStorage.deleteItem(product);
  }

}
