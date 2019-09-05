import { Injectable } from '@angular/core';

import { Product } from '../interfaces/product';
import { shoppingCartItem } from '../interfaces/shopping-cart-data';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartData: shoppingCartItem[];

  constructor() {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      this.shoppingCartData = data;
    } else {
      this.shoppingCartData = [];
    }
  }

  addProduct(product: Product): string {
    this.checkProductInData(product);
    localStorage.setItem('data', JSON.stringify(this.shoppingCartData));
    const message = `A ${product.name} was added to`;
    return message;
  }

  checkProductInData(product: Product) {
    if (this.shoppingCartData.length) {
      const data = this.shoppingCartData;
      for (let i = 0; i < data.length; i++) {
        if (this.shoppingCartData[i].id === product.id) {
          this.shoppingCartData[i].quantity++;
        } else {
          this.shoppingCartData.push({
            quantity: 1,
            name: product.name,
            id: product.id,
            price: product.price
          });
        }
      }
    } else {
      this.shoppingCartData.push({
        quantity: 1,
        name: product.name,
        id: product.id,
        price: product.price
      });
    }
  }
}
