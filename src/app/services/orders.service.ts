import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Order } from '../models/order.model';
import { count, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.ORDERS_API_URL}/orders`);
  }
  getOrderByID(orderId: string): Observable<Order> {
    return this.http.get<Order>(
      `${environment.ORDERS_API_URL}/orders/${orderId}`
    );
  }
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.ORDERS_API_URL}/orders`, order);
  }
}
