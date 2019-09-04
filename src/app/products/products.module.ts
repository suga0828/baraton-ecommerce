import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FiltersComponent } from './filters/filters.component';
import { FilterItemComponent } from './filter-item/filter-item.component';

@NgModule({
  declarations: [ProductsComponent, ProductItemComponent, FiltersComponent, FilterItemComponent],
  imports: [
    CommonModule,

    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
