import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { OrderItem } from 'src/app/models/order-item.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ClientStorage } from 'src/app/shared/storage/client-storage';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  private client: Client;
  public orders: Order[] = [];
  public isBusy = true;

  constructor(
    private clientStorage: ClientStorage,
    private orderService: OrderService
  ) {
    if (this.clientStorage.getAll().length)
      this.client = this.clientStorage.getAll()[0];
  }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    this.isBusy = true;
    this.orderService.getByClient(this.client.id).then(async (response: Order[]) => {
      this.orders = response;
      this.isBusy = false;
    }, async (error: any) => {
      this.isBusy = false;
      alert('Erro ao carregar produtos');
    });
  }

  public getOrderItems(order: Order) {
    if (order.orderItems?.length) {
      this.toggleCollapse(order);
      return;
    }

    this.isBusy = true;
    this.orderService.getOrderItems(order.id).then(async (response: OrderItem[]) => {
      order.orderItems = response;
      this.toggleCollapse(order);
      this.isBusy = false;
    }, async (error: any) => {
      this.isBusy = false;
      alert('Erro ao carregar produtos');
    });
  }

  public isCollapsed(order: Order): boolean {
    let index = this.orders.indexOf(order);
    let icon = document.getElementsByClassName('collapse-icon')[index];
    if (icon.classList.contains("fa-chevron-circle-down"))
      return true;
    else
      return false;
  }

  private toggleCollapse(order: Order) {
    let index = this.orders.indexOf(order);
    let icon = document.getElementsByClassName('collapse-icon')[index];

    if (icon.classList.contains("fa-chevron-circle-down")) {
      icon.classList.remove('fa-chevron-circle-down');
      icon.classList.add('fa-chevron-circle-up');
    } else {
      icon.classList.remove('fa-chevron-circle-up');
      icon.classList.add('fa-chevron-circle-down');
    }
  }

}
