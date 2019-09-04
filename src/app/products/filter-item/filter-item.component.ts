import { Component, OnInit, Input } from '@angular/core';

import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {

  @Input() public category: Category;

  constructor() { }

  ngOnInit() {
  }

}
