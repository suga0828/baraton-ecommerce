import { Injectable } from '@angular/core';

import { Product } from '../interfaces/product';
import { shoppingCartItem } from '../interfaces/shopping-cart-data';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartData: shoppingCartItem[];

  constructor(private _snackBar: MatSnackBar) {
    const data = this.getProducts();
    if (data) {
      this.shoppingCartData = data;
    } else {
      this.shoppingCartData = [];
    }
  }

  getProducts(): shoppingCartItem[] {
    return JSON.parse(localStorage.getItem('data'));
  }

  addProduct(product: Product) {
    const dataChecked = this.checkIndexInData(product);
    if (dataChecked.index === -1) {
      const priceInNumber = Number(product.price.replace(/[^0-9.-]+/g, ''));
      const newShoppingCartItem = {
        quantity: 1,
        name: product.name,
        id: product.id,
        price: priceInNumber
      };
      dataChecked.data.push(newShoppingCartItem);
    } else {
      dataChecked.data[dataChecked.index].quantity++;
    }
    const newData = dataChecked.data;
    localStorage.setItem('data', JSON.stringify(newData));
    const message = `A ${product.name} was added to Shopping Cart`;
    this.showNotification(message);
  }

  deleteProduct(product: Product) {
    const dataChecked = this.checkIndexInData(product);
    if (dataChecked.index !== -1) {
      dataChecked.data.splice(dataChecked.index, 1);
    }
    const newData = dataChecked.data;
    localStorage.setItem('data', JSON.stringify(newData));
    const message = `The ${product.name} was deleted from Shopping Cart`;
    this.showNotification(message);
  }

  deleteAProduct(product: Product) {
    const dataChecked = this.checkIndexInData(product);
    if (dataChecked.index !== -1) {
      dataChecked.data[dataChecked.index].quantity--;
    }
    const newData = dataChecked.data;
    localStorage.setItem('data', JSON.stringify(newData));
    const message = `An ${product.name} item was deleted from Shopping Cart`;
    this.showNotification(message);
  }

  checkIndexInData(product: Product) {
    let actualData = JSON.parse(localStorage.getItem('data')) || [];
    let indexInData = -1;
    if (actualData) {
      indexInData = actualData.findIndex(item => item.id === product.id);
    }
    const checked = { data: actualData, index: indexInData };
    return checked;
  }

  showNotification(message: string, duration?: number) {
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: duration || 3000,
      data: message
    });
  }

  sendPurchase(purchaseData: shoppingCartItem[]) {
    // Sólo para mostrar la información
    console.log(purchaseData);
    const message = `Justo en este momento se acaba de eliminar la información de la compra, puede mirar la información que había antes de enviarla en la consola`;
    this.showNotification(message, 1000000);
    // Send information to backend, then
    this.clearStorage();
  }

  clearStorage() {
    localStorage.clear();
  }
}
