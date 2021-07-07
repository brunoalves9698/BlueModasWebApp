import { RegisterOrderCommand } from './../../commands/inputs/order/register-order.command';
import { ProductCommand } from './../../commands/inputs/order/product.command';
import { ClientCommand } from './../../commands/inputs/order/client.command';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { Product } from 'src/app/models/product.model';
import { CartStorage } from 'src/app/shared/storage/cart-storage';
import { ClientStorage } from 'src/app/shared/storage/client-storage';
import { GenericResultCommand } from 'src/app/commands/core/generic-result.command';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  public products: Product[] = [];
  public client: Client;
  public isBusy = false;

  constructor(
    private router: Router,
    private cartStorage: CartStorage,
    private clientStorage: ClientStorage,
    private orderService: OrderService
  ) {
    if (this.clientStorage.getAll().length)
      this.client = this.clientStorage.getAll()[0];
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.products = this.cartStorage.getAll();
  }

  public decrementQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.cartStorage.updateItem(product);
      return;
    }

    let confirm = window.confirm('Deseja remover esse produto da cesta?');
    if (confirm) {
      this.removeFromCart(product);
      this.getProducts();
    }
  }

  public incrementQuantity(product: Product) {
    product.quantity += 1;
    this.cartStorage.updateItem(product);
  }

  private removeFromCart(product: Product) {
    this.cartStorage.deleteItem(product);
  }

  public getTotal(): number {
    let total: number = 0;
    this.products.forEach((product: Product) => {
      total += product.quantity * product.price;
    });

    return total;
  }

  public finalizeOrder() {
    if (!this.client) {
      alert('Preencha sua identificação para continuar');
      this.router.navigateByUrl('/client');
      return;
    }

    let dataConfirm = window.confirm('Deseja alterar os dados de identificação?');
    if (dataConfirm) {
      this.router.navigateByUrl('/client');
      return;
    }

    let orderConfirm = window.confirm('Deseja finalizar essa compra?');
    if (!orderConfirm)
      return;

    let command: RegisterOrderCommand = this.generateCommand();
    this.save(command);
  }

  private generateCommand(): RegisterOrderCommand {
    let clientCommand: ClientCommand = new ClientCommand(
      this.client.id,
      this.client.stateId,
      this.client.cityId,
      this.client.name,
      this.client.email,
      this.client.phone,
      this.client.zipCode,
      this.client.address,
      this.client.addressNumber,
      this.client.neighborhood);

    let productsCommand: ProductCommand[] = [];
    this.products.forEach((product: Product) => {
      productsCommand.push(new ProductCommand(product.id, product.quantity));
    });

    let registerOrderCommand: RegisterOrderCommand = new RegisterOrderCommand(clientCommand, productsCommand);

    return registerOrderCommand;
  }

  private save(command: RegisterOrderCommand) {
    this.isBusy = true;
    this.orderService.post(command).then(async (response: GenericResultCommand) => {
      this.isBusy = false;
      if (!response.success) {
        alert('Erro ao realizar compra.');
        return;
      }

      this.client.id = response.data.clientId;
      this.clientStorage.deleteAll();
      this.clientStorage.insertItem(this.client);
      this.cartStorage.deleteAll();
      alert('Compra realizada com sucesso.');
      this.router.navigateByUrl('/history');
    }, (error: any) => {
      this.isBusy = false;
      alert('Erro ao realizar compra.');
    });
  }

}
