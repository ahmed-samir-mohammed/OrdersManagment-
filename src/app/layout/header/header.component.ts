import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `<div class="flex justify-between items-center my-8">
    <h1 class="text-xl lg:text-4xl font-inter font-black text-white ">
      Orders Managment
    </h1>
    <ul class="flex gap-4">
      <li>
        <a
          class="text-sm hover:text-blue-500 text-white duration-300"
          routerLink="/"
        >
          Products
        </a>
      </li>
      <li>
        <a
          class="text-sm hover:text-blue-500 text-white duration-300"
          routerLink="/orders"
        >
          Orders
        </a>
      </li>
    </ul>
  </div> `,
})
export class HeaderComponent {}
