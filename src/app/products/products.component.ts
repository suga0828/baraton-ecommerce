import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public products: Product[];

  constructor(
    private productsService: ProductsService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService
      .getProducts()
      .subscribe( (products: Product[]) => {
        this.products = products;
      });
  }
}
