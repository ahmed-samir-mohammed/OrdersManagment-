import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { OProduct, Order } from '../../models/order.model';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-order-destails',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, ProductCardComponent],
  template: `
    @if (order) { @defer (on immediate) {
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div class="mb-4 border-b pb-4 flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800">
            Order #{{ order.id }}
          </h2>
          <p class="text-sm text-gray-600">
            Order Date: {{ order.OrderDate | date }}
          </p>
        </div>
        <span
          class="px-3 py-1 text-xs font-bold rounded-full {{
            order.PaymentType == 'Online'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }}"
        >
          {{ order.PaymentType | titlecase }}
        </span>
      </div>
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          User Information
        </h3>
        <div
          class="grid grid-cols-1 bg-gray-100 p-4 rounded-lg sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div class="flex flex-col">
            <p class="text-base font-semibold text-gray-800">ID</p>
            <p class="text-sm text-gray-600">{{ user.id }}</p>
          </div>
          <div class="flex flex-col">
            <p class="text-base font-semibold text-gray-800">Name</p>
            <p class="text-sm text-gray-600">{{ user.Name }}</p>
          </div>
          <div class="flex flex-col">
            <p class="text-base font-semibold text-gray-800">Email</p>
            <p class="text-sm text-gray-600">{{ user.Email }}</p>
          </div>
          <div class="flex flex-col">
            <p class="text-base font-semibold text-gray-800">Phone</p>
            <p class="text-sm text-gray-600">{{ user.Phone }}</p>
          </div>
          <div class="flex flex-col">
            <p class="text-base font-semibold text-gray-800">Register Date</p>
            <p class="text-sm text-gray-600">{{ user.RegisterDate | date }}</p>
          </div>
          <div class="flex flex-col">
            <p class="text-base font-semibold text-gray-800">Address</p>
            <p class="text-sm text-gray-600">{{ user.Address }}</p>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Products Ordered
        </h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          @for (product of products; track $index) {
          <app-product-card [product]="product" [editable]="false" />
          }
        </div>
      </div>
    </div>
    }@placeholder ( minimum 500) {
    <div class="flex justify-center items-center text-white w-full h-full">
      <p>Loading...</p>
    </div>
    } }
  `,
})
export class OrderDestailsComponent {
  id!: string;
  products!: Product[];
  order!: Order;
  user!: User;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private productService: ProductsService,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProducts();
    this.orderService.getOrderByID(this.id).subscribe({
      next: (order: Order) => {
        this.order = order;
        this.productFilter(this.order.Products);
        this.getUser(this.order.UserId);
      },
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
    });
  }

  getUser(userId: string) {
    this.userService.getUserByID(userId).subscribe({
      next: (user: User) => (this.user = user),
    });
  }

  productFilter(products: OProduct[]) {
    this.products = products
      .map((productItem) => {
        return this.products.find((product) => {
          return product.id === productItem.ProductId;
        });
      })
      .filter((product) => product !== undefined);
  }
}
