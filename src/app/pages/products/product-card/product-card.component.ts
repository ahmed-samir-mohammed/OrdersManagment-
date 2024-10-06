import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { EditQantityModalComponent } from '../edit-qantity-modal/edit-qantity-modal.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, EditQantityModalComponent],
  template: `
    @defer (on immediate) {
    <div
      class="rounded-lg p-4 flex {{ editable ? 'bg-white' : 'bg-gray-100' }}"
    >
      <img
        src="{{ product.ProductImg }}"
        class="rounded-sm w-[5rem] h-[5rem] object-cover me-2"
        alt="{{ product.ProductName }}"
      />
      <div class="flex flex-col w-full justify-start relative">
        <div class="flex justify-between">
          <h2 class="font-bold font-inter text-[1rem]">
            {{ product.ProductName }}
          </h2>
          <span>{{ product.ProductPrice }} $</span>
        </div>
        <div class="flex mt-2">
          <p class="mb-0 text-sm">Available {{ product.AvailablePieces }}</p>
        </div>
        @if (editable) {
        <button
          class="group w-8 h-8 p-2 border border-slate-900 rounded-lg hover:bg-slate-900 duration-300 cursor-pointer flex items-center justify-center absolute end-0 bottom-0"
          (click)="showEditQuantityModal = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-edit-2 group-hover:text-white"
          >
            <path
              d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
            ></path>
          </svg>
        </button>
        }
      </div>
    </div>

    @if (showEditQuantityModal) {
    <app-edit-qantity-modal [product]="product" (close)="closeModale($event)" />
    } }
  `,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() editable: boolean = true;
  @Output() updated: EventEmitter<boolean> = new EventEmitter();

  showEditQuantityModal: boolean = false;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}
  closeModale(close: boolean) {
    this.showEditQuantityModal = !close;
    this.updated.emit(true);
  }
}
