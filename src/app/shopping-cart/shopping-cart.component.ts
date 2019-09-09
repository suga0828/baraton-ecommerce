import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../interfaces/product';
import { shoppingCartItem } from '../interfaces/shopping-cart-data';

import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantity', 'price', 'actions'];
  dataSource: MatTableDataSource<shoppingCartItem>;
  products: shoppingCartItem[] = [];
  total = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products = this.shoppingCartService.getProducts();
    if (this.products && this.products.length) {
      this.dataSource = new MatTableDataSource<shoppingCartItem>(this.products);
      this.getTotal(this.products);
    } else {
      this.dataSource = new MatTableDataSource<shoppingCartItem>([]);
      this.total = 0;
    }
  }

  getTotal(products: shoppingCartItem[]) {
    if (products.length > 1) {
      this.total = Number(
        products.reduce((a, b) => ({
          price: a.quantity * a.price + b.quantity * b.price,
          quantity: 1,
          available: true,
          sublevel_id: 0,
          name: '',
          id: ''
        })).price
      );
    } else {
      this.total = products[0].quantity * products[0].price;
    }
  }

  deleteProduct(product: Product) {
    this.shoppingCartService.deleteProduct(product);
    this.getProducts();
  }

  deleteAnItem(product: Product) {
    this.shoppingCartService.deleteAProduct(product);
    this.getProducts();
  }

  addProduct(product: Product) {
    this.shoppingCartService.addProduct(product);
    this.getProducts();
  }

  sendPurchase() {
    if (this.products) {
      this.shoppingCartService.sendPurchase(this.products);
    }
    this.router.navigate(['/landing']);
  }
}
