import { Injectable } from '@angular/core';

import { Product } from '../interfaces/product';
import { shoppingCartItem } from '../interfaces/shopping-cart-data';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartData: shoppingCartItem[] = [];

  constructor() { }

  addProduct(product: Product) {
    this.checkLocalStorage(product);
    localStorage.setItem('data', JSON.stringify(this.shoppingCartData));
  }

  checkLocalStorage(product: Product) {
    let data: shoppingCartItem[] = JSON.parse(localStorage.getItem('data'));
    if (data) {
      this.checkProductInData(data, product);
    } else {
      this.shoppingCartData.push({
        quantity: 1,
        product: product
      });
    }
  }

  checkProductInData(data: shoppingCartItem[], product: Product) {
    console.log(data, product)
    for (let i = 0; i < data.length; i++) {
      if (data[i].product === product) {
        data[i].quantity++
      }
    }
    this.shoppingCartData = data;
  }

  getProductInShoppingCart() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
