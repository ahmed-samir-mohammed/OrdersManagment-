import { Component, Inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    @defer (on immediate) {
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      @for (item of products; track $index) {
      <app-product-card
        [product]="item"
        (updated)="productQuantityUpdate($event)"
      />
      }
    </div>
    } @placeholder ( minimum 500) {
    <div class="flex justify-center items-center text-white w-full h-[80vh]">
      <p>Loading...</p>
    </div>
    }
  `,
})
export class ProductsComponent {
  constructor(private productsService: ProductsService) {}
  products!: Product[];
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((product: Product[]) => {
      this.products = product;
    });
  }

  productQuantityUpdate(updated: boolean) {
    updated ? this.getProducts() : false;
  }
}
