import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.model';
import { DatePipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddOrderModalComponent } from './add-order-modal/add-order-modal.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule,
    NgxPaginationModule,
    NgFor,
    AddOrderModalComponent,
  ],
  template: `
    @defer (on viewport; when showModal) {
    <table class="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <thead>
        <tr class="bg-gray-100 text-gray-700">
          <th class="text-left p-4">#</th>
          <th class="text-left p-4">Order Date</th>
          <th class="text-left p-4">User ID</th>
          <th class="text-left p-4">Products</th>
          <th class="text-left p-4">Payment Type</th>
          <th class="text-left p-4"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b-[1px] border-gray-200 hover:bg-gray-50 transition duration-200"
          *ngFor="
            let item of orders | paginate : { itemsPerPage: 15, currentPage: p }
          "
        >
          <td class="flex items-center p-4">
            <div
              class="w-8 h-8 flex items-center justify-center rounded-full text-slate-700 font-bold"
            >
              {{ item.id }}
            </div>
          </td>
          <td class="p-4 font-medium text-gray-800">
            {{ item.OrderDate | date }}
          </td>
          <td class="p-4 text-gray-700">{{ item.UserId }}</td>
          <td class="p-4 text-gray-700">{{ item.Products.length }}</td>
          <td class="p-4">
            <span
              class="rounded-full text-xs py-2 px-4 font-inter font-bold {{
                item.PaymentType === 'Online'
                  ? 'bg-green-200 text-green-900'
                  : 'bg-slate-200 text-slate-900'
              }}"
            >
              {{ item.PaymentType }}
            </span>
          </td>
          <td class="p-4">
            <a
              class="inline-block px-4 py-2 rounded-full text-xs font-semibold border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition duration-200"
              routerLink="/orders/{{ item.id }}"
            >
              Details
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center mt-4">
      <pagination-controls
        (pageChange)="p = $event"
        class="pagination"
      ></pagination-controls>
    </div>
    } @placeholder ( minimum 500) {
    <div class="flex justify-center items-center text-white w-full h-[80vh]">
      <p>Loading...</p>
    </div>
    }
    <button
      (click)="addOrder()"
      class="fixed bottom-12 right-12 rounded-full w-12 h-12 text-2xl flex justify-center items-center bg-white text-slate-950 shadow-lg"
    >
      +
    </button>
    @if (showModal) {
    <app-add-order-modal (close)="closeModal($event)" />
    }
  `,
})
export class OrdersComponent {
  constructor(private ordersService: OrdersService) {}
  orders!: Order[];
  p: number = 1;
  showModal: boolean = false;
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders.reverse();
    });
  }
  addOrder() {
    this.showModal = !this.showModal;
  }
  closeModal(close: boolean) {
    this.showModal = !close;
    this.getOrders();
  }
}
