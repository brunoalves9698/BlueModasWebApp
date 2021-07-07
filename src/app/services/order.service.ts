import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterOrderCommand } from 'src/app/commands/inputs/order/register-order.command';
import { GenericResultCommand } from 'src/app/commands/core/generic-result.command';
import { Order } from './../models/order.model';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/v1/orders`;
  }

  getByClient(clientId: string): Promise<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/client/${clientId}`).toPromise();
  }

  getOrderItems(idOrder: string): Promise<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/items/${idOrder}`).toPromise();
  }

  post(resource: RegisterOrderCommand): Promise<GenericResultCommand> {
    return this.http.post<GenericResultCommand>(this.apiUrl, resource).toPromise();
  }

}
