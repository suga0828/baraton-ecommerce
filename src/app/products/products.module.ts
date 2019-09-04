import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FilterItemComponent } from './filter-item/filter-item.component';

@NgModule({
  declarations: [ProductsComponent, ProductItemComponent, FilterItemComponent],
  imports: [
    CommonModule,

    ProductsRoutingModule,
    SharedModule,

    PipesModule.forRoot()
  ]
})
export class ProductsModule {}
