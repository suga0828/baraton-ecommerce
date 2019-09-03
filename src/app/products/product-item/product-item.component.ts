import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() public item: Product;

  constructor() {}

  ngOnInit() {}
}
