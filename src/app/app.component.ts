import { Component, ɵINTERNAL_APPLICATION_ERROR_HANDLER } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `<div class="container mx-auto px-4 mt-8">
    <app-header />
    <router-outlet />
  </div> `,
})
export class AppComponent {
  title = 'orders-management';
}
