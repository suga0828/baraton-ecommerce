import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from '../interfaces/category';

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
  public categories: Category[] = [] as Category[];
  query: string;
  searchFrom: FormGroup;
  searchSubscription: Subscription;

  filterByOptions = [
    { name: 'Only Availables' },
    { name: 'Only prices smaller than' },
    { name: 'Only amount smaller than' },
  ];

  minPrice = 0;
  maxPrice = 0;

  sortByOptions = [
    {
      name: 'Sort by Availability',
      options: [
        { name: 'Availables first', value: 'asc' },
        { name: 'Availables last', value: 'desc' },
      ]
    },
    {
      name: 'Sort by Price',
      options: [
        { name: 'Low to Hight', value: 'asc' },
        { name: 'Hight to Low', value: 'desc' },
      ]
    },
    {
      name: 'Sort by Quantity',
      options: [
        { name: 'Low to Hight', value: 'asc' },
        { name: 'Hight to Low', value: 'desc' },
      ]
    }
  ];

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
    this.suscribeSearch();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.takePrices(this.products);
    });
  }

  takePrices(products) {
    for (let i = 0; i < products.length; i++) {
      const price = Number(products[i].price.replace(/[^0-9.-]+/g,""))
      if (this.minPrice > price) {
        this.minPrice = price;
      }
      if (this.maxPrice < price) {
        this.maxPrice = price;
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

  sortBy(name, sort) {
    console.log(name, sort);
    if (name === 'Sort by Availability') {
      this.products = this.products.sort(function(x, y) {
        return (x.available === y.available)? 0 : x.available? -1 : 1;
      });
    }
    if (name === 'Sort by Quantity') {
      this.products = this.products.sort( (x, y) => {
        return x.quantity - y.quantity;
      });
    }
    if (name === 'Sort by Price') {
      this.products = this.products.sort( (x, y) => {
        const firstPriceToNumber = Number(x.price.replace(/[^0-9.-]+/g,""));
        const secondPriceToNumber = Number(y.price.replace(/[^0-9.-]+/g,""));
        return firstPriceToNumber - secondPriceToNumber;
      });
    }
    // Order
    if( sort.value === 'asc') {
      this.products
    } else if ( sort.value === 'desc' ) {
      this.products.reverse();
    }
  }

  filterBy(sort, value?) {
    console.log(sort)
    if (sort.name === 'Show availables') {
      this.products = this.products.filter(item => {
        console.log(item)
        return item.available === true;
      });
    }
    if (sort.name === 'Only prices smaller than') {
      this.products = this.products.filter(item => {
        const priceToNumber = Number(item.price.replace(/[^0-9.-]+/g,""));
        return priceToNumber < value;
      });
    }
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    
    if (value >= 1000) {
      // this.filterBy('Only prices smaller than', value);
      return '$' + Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
