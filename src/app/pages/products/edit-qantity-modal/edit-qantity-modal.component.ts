import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-edit-qantity-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ` <div
    class="fixed inset-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center z-10"
  >
    <div class="bg-white p-8 rounded-lg max-w-xl w-11/12">
      <div class="flex justify-between">
        <h2 class="font-inter text-2xl font-bold text-slate-900 mb-4">
          Edit Quantity
          <span class="text-sm text-gray-600"
            >( {{ product.ProductName }} )</span
          >
        </h2>
        <button
          (click)="close.emit(true)"
          class="text-gray-600 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
        >
          X
        </button>
      </div>
      <div class="p-4 bg-white border rounded-lg">
        <form [formGroup]="editQuantityForm" (ngSubmit)="submitNewQuantity()">
          <div class="mb-4">
            <label for="quantity" class="block text-gray-700 font-bold mb-2">
              New Quantity:
            </label>
            <input
              id="quantity"
              formControlName="quantity"
              class="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            [disabled]="editQuantityForm.invalid"
            class="w-full p-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 disabled:opacity-5 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>`,
})
export class EditQantityModalComponent {
  @Input() product!: Product;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  editQuantityForm!: FormGroup;
  showEditQuantityModal: boolean = false;
  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editQuantityForm = this.fb.group({
      quantity: [null, [Validators.required]],
    });
  }

  submitNewQuantity() {
    this.productsService
      .editProductQuantity({
        id: this.product.id,
        AvailablePieces: this.editQuantityForm.value.quantity,
        ProductName: this.product.ProductName,
        ProductImg: this.product.ProductImg,
        ProductPrice: this.product.ProductPrice,
      })
      .subscribe({
        next: () => this.close.emit(true),
      });
  }
}
