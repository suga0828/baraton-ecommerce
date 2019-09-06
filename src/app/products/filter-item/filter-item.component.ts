import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Category } from 'src/app/interfaces/category';
import { checkCategoryEvent } from '../../interfaces/check-category-event';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit, OnChanges {
  @Input() public category: Category;
  @Output() public filterByCategoryId = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  changeCheckbox(event, category: Category) {
    this.filterByCategoryId.emit({ checked: event.checked, id: category.id });
  }

  sendFilterToParent(event: checkCategoryEvent) {
    this.filterByCategoryId.emit({
      checked: event.checked,
      id: event.id
    });
  }

  ngOnChanges() {}
}
