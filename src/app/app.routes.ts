import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDestailsComponent } from './pages/order-details/order-destails.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: OrderDestailsComponent },
];
