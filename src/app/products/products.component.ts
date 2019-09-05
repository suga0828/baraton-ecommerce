import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public products: Product[];
  public initialProducts: Product[];
  public categories: Category[] = [] as Category[];
  query: string;
  searchFrom: FormGroup;
  searchSubscription: Subscription;

  filterByOptions = [
    { name: 'All', value: 'all', order: 'asc' },
    { name: 'Only Availables', value: 'availability', order: 'asc' }
  ];

  filterApplied = false;

  minPrice = 0;
  maxPrice = 0;

  minQuantity = 0;
  maxQuantity = 0;

  sortByOptions = [
    { name: 'Availables first', value: 'availability', order: 'asc' },
    { name: 'Availables last', value: 'availability', order: 'desc' },
    { name: 'Price: Low to Hight', value: 'price', order: 'asc' },
    { name: 'Price: Hight to Low', value: 'price', order: 'desc' },
    { name: 'Quantity: Low to Hight', value: 'quantity', order: 'asc' },
    { name: 'Quantity: Hight to Low', value: 'quantity', order: 'desc' }
  ];

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private shoppingCartService: ShoppingCartService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.buildSearchForm();
    this.suscribeSearch();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.initialProducts = products;
      this.products = products;
      this.takePrices(this.products);
      this.takeQuantities(this.products);
    });
  }

  takePrices(products: Product[]) {
    for (let i = 0; i < products.length; i++) {
      const price = Number(products[i].price.replace(/[^0-9.-]+/g, ''));
      if (this.minPrice > price) {
        this.minPrice = price;
      }
      if (this.maxPrice < price) {
        this.maxPrice = price;
      }
    }
  }

  takeQuantities(products: Product[]) {
    for (let i = 0; i < products.length; i++) {
      if (this.minQuantity > products[i].quantity) {
        this.minQuantity = products[i].quantity;
      }
      if (this.maxQuantity < products[i].quantity) {
        this.maxQuantity = products[i].quantity;
      }
    }
  }

  getCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  buildSearchForm() {
    this.searchFrom = this.formBuilder.group({
      search: [''],
      filterBySelect: [''],
      sortBySelect: ['']
    });
  }

  get search() {
    return this.searchFrom.get('search');
  }

  get sortBySelect() {
    return this.searchFrom.get('sortBySelect');
  }

  get filterBySelect() {
    return this.searchFrom.get('filterBySelect');
  }

  suscribeSearch() {
    this.searchSubscription = this.search.valueChanges.subscribe(() => {
      this.query = this.search.value;
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  sortBy(sort) {
    if (sort.value === 'availability') {
      this.products = this.products.sort(function(x, y) {
        return x.available === y.available ? 0 : x.available ? -1 : 1;
      });
    }
    if (sort.value === 'quantity') {
      this.products = this.products.sort((x, y) => {
        return x.quantity - y.quantity;
      });
    }
    if (sort.value === 'price') {
      this.products = this.products.sort((x, y) => {
        const firstPriceToNumber = Number(x.price.replace(/[^0-9.-]+/g, ''));
        const secondPriceToNumber = Number(y.price.replace(/[^0-9.-]+/g, ''));
        return firstPriceToNumber - secondPriceToNumber;
      });
    }
    // Order
    if (sort.order === 'asc') {
      this.products;
    } else if (sort.order === 'desc') {
      this.products.reverse();
    }
  }

  filterBy(filter) {
    if (filter.value === 'all') {
      this.products = this.initialProducts;
    }
    if (filter.value === 'availability') {
      this.products = this.products.filter(item => {
        return item.available === true;
      });
    }
  }

  isFilterApplied(reset?: boolean) {
    if (reset || !this.filterApplied) {
      this.products = this.initialProducts;
    }
  }

  filterByPrices(price: number) {
    this.products = this.initialProducts.filter(item => {
      const itemPrice = Number(item.price.replace(/[^0-9.-]+/g, ''));
      return itemPrice < price;
    });
  }

  filterByQuantities(quantity: number) {
    this.products = this.initialProducts.filter(item => {
      return item.quantity > quantity;
    });
  }

  formatPriceLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return '$' + Math.round(value / 1000) + 'k';
    }

    return value;
  }

  formatQuantityLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
  }

  addToShoppingCart(product: Product) {
    const message = this.shoppingCartService.addProduct(product);
    this.productAddedNotification(message);
  }

  productAddedNotification(message: string) {
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 4000000,
      data: message
    });
  }
}
