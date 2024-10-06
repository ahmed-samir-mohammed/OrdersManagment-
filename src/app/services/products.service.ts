import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.PRODUCTS_API_URL}/products`).pipe(
      map((product) => {
        return product.sort((a, b) => a.AvailablePieces - b.AvailablePieces);
      })
    );
  }
  editProductQuantity(body: Product):Observable<number> {
    return this.http.put<number>(`${environment.PRODUCTS_API_URL}/products/${body.id}`, body)
  }
}
