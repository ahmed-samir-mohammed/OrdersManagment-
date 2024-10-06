import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ProductsService } from '../../../services/products.service';
import { User } from '../../../models/user.model';
import { Product } from '../../../models/product.model';
import { NgFor } from '@angular/common';
import { OrdersService } from '../../../services/orders.service';
import { Order, OProduct } from '../../../models/order.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-order-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  template: `<div
    class="fixed inset-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg max-w-xl w-11/12">
      <div class="flex justify-between">
        <h2 class="font-inter text-2xl font-bold text-slate-900 mb-4">
          Add Order
        </h2>
        <button
          (click)="close.emit(true)"
          class="text-gray-600 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
        >
          X
        </button>
      </div>
      <div class="p-4 bg-white border rounded-lg">
        <form [formGroup]="orderForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label for="UserID" class="block text-gray-700 font-bold mb-2">
              User:
            </label>
            <select
              id="UserID"
              formControlName="UserID"
              class="w-full p-2 border rounded-md"
              required
            >
              <option *ngFor="let user of userList" [value]="user.id">
                {{ user.Name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label for="PaymentType" class="block text-gray-700 font-bold mb-2">
              Payment Type:
            </label>
            <select
              id="PaymentType"
              formControlName="PaymentType"
              class="w-full p-2 border rounded-md"
              required
            >
              <option value="Online">Online</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Products:</label>
            <div formArrayName="Products">
              <div
                *ngFor="let product of products.controls; let i = index"
                [formGroupName]="i"
                class="mb-2"
              >
                <div class="flex items-center space-x-4">
                  <select
                    formControlName="productId"
                    class="p-2 border rounded-md w-1/2"
                    required
                  >
                    @for (product of productList; track $index) {
                    <option
                      [value]="product.id"
                      (click)="selectProduct(product)"
                    >
                      {{ product.ProductName }}
                    </option>
                    }
                  </select>
                  <button
                    type="button"
                    (click)="removeProduct(i)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              (click)="addProduct()"
              class="mt-2 text-blue-600 hover:text-blue-800"
            >
              Add Product
            </button>
          </div>

          <button
            type="submit"
            [disabled]="orderForm.invalid || selectedProducts.length == 0"
            class="w-full p-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 disabled:opacity-5 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>`,
})
export class AddOrderModalComponent implements OnInit {
  orderForm!: FormGroup;
  productList!: Product[];
  userList!: User[];
  selectedProducts: OProduct[] = [];
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private productService: ProductsService,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      UserID: ['', Validators.required],
      PaymentType: ['', Validators.required],
      Products: this.fb.array([]),
    });
    this.getUsers();
    this.getProducts();
  }

  get products(): FormArray {
    return this.orderForm.get('Products') as FormArray;
  }

  addProduct() {
    const productGroup = this.fb.group({
      productId: ['', Validators.required],
    });
    this.products.push(productGroup);
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => (this.userList = users),
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.productList = products),
    });
  }

  selectProduct(product: Product) {
    this.selectedProducts.push({
      ProductId: product.id,
      Quantity: product.AvailablePieces,
    });
    console.log(this.selectedProducts);
  }

  onSubmit() {
    console.log(this.orderForm);
    if (this.orderForm.invalid) return;
    let order: Order = {
      id: Math.floor(Math.random() * 10000) + 1,
      OrderDate: new Date(),
      UserId: this.orderForm.value.UserID,
      Products: this.selectedProducts,
      PaymentType: this.orderForm.value.PaymentType,
    };
    this.orderService.addOrder(order).subscribe({
      complete: () => {
        this.close.emit(true);
        this.toastr.success('Order added');
      },
    });
  }
}
