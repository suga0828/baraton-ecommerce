import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  declarations: [ProductItemComponent],
  imports: [
    CommonModule,

    ProductsRoutingModule
  ]
})
export class ProductsModule { }
