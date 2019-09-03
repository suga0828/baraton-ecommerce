import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  item;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService
      .getProducts()
      .subscribe((res: Product) => (this.item = res));
  }
}
