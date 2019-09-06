import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { checkCategoryEvent } from '../interfaces/check-category-event';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


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
  categoriesIdToFilter: number[] = [];
  query: string;
  searchFrom: FormGroup;
  searchSubscription: Subscription;
  loading = true;

  filterByOptions = [
    { name: 'All', value: 'all', order: 'asc' },
    { name: 'Only Availables', value: 'availability', order: 'asc' }
  ];

  @ViewChild('matSliderPrices', { static: false })
  matSliderPrices: any;
  minPrice = 0;
  maxPrice = 0;

  @ViewChild('matSliderQuantities', { static: false })
  matSliderQuantities: any;
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
    private shoppingCartService: ShoppingCartService
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
      this.loading = false;
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
      availabilityFilter: [''],
      sortBySelect: ['']
    });
  }

  get search() {
    return this.searchFrom.get('search');
  }

  get sortBySelect() {
    return this.searchFrom.get('sortBySelect');
  }

  get availabilityFilter() {
    return this.searchFrom.get('availabilityFilter');
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

  filterByAvailability(filter: string) {
    if (filter === 'availability') {
      this.products = this.products.filter(item => {
        return item.available === true;
      });
    }
  }

  filterByPrices(price: number) {
    this.products = this.products.filter(item => {
      const itemPrice = Number(item.price.replace(/[^0-9.-]+/g, ''));
      return itemPrice > price;
    });
  }

  filterByQuantities(quantity: number) {
    this.products = this.products.filter(item => {
      return item.quantity > quantity;
    });
  }

  filterByCategories() {
    if (this.categoriesIdToFilter.length) {
      for (let i = 0; i < this.categoriesIdToFilter.length; i++) {
        this.products = this.products.filter(item => {
          return item.sublevel_id === this.categoriesIdToFilter[i];
        });
      }
    }
  }

  setCategoriesToFilter(event: checkCategoryEvent) {
    if (event.checked) {
      this.categoriesIdToFilter.push(event.id);
    } else {
      const cateogyIndex = this.categoriesIdToFilter.indexOf(event.id);
      this.categoriesIdToFilter.splice(cateogyIndex, 1);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.products = this.initialProducts;
    this.filterByQuantities(this.matSliderQuantities.value);
    this.filterByPrices(this.matSliderPrices.value);
    this.filterByAvailability(this.availabilityFilter.value);
    this.filterByCategories();
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
    this.shoppingCartService.addProduct(product);
  }
}
