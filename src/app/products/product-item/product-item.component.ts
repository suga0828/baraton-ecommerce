import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() public product: Product;
  @Output() productToAdd = new EventEmitter<Product>();

  constructor() {}

  ngOnInit() {}

  emitProductToShoppingCart(product: Product) {
    this.productToAdd.emit(product);
  }
}
