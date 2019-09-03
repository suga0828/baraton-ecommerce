import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [ProductsComponent, ProductItemComponent, FiltersComponent],
  imports: [
    CommonModule,

    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
