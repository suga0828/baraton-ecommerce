import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from '../interfaces/category';

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
  public categories: Category[] = [] as Category[];
  searchFrom: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.buildSearchForm();
  }

  getProducts() {
    this.productsService
      .getProducts()
      .subscribe( (products: Product[]) => {
        this.products = products;
      });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  buildSearchForm() {
    this.searchFrom = this.formBuilder.group({
      search: ['']
    });
  }

  get search() {
    return this.searchFrom.get('search');
  }
}
