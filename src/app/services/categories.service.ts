import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../interfaces/category';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

const TREE_DATA: Category[] = [
	{
		"id": 1,
		"name": "Bebidas",
		"sublevels": [
			{
				"id": 1,
				"name": "Gaseosas",
				"sublevels": [
					{
						"id": 2,
						"name": "Con azúcar"
					},
					{
						"id": 3,
						"name": "Sin azúcar"
					}
				]
			}
		]
	},
	{
		"id": 2,
		"name": "Desayunos",
		"sublevels": [
			{
				"id": 4,
				"name": "Fake 1",
				"sublevels": [
					{
						"id": 5,
						"name": "Fake 2"
					},
					{
						"id": 6,
						"name": "Fake 3",
						"sublevels": [
							{
								"id": 7,
								"name": "Fake 4"
							}
						]
					}
				]
			}
		]
	},
	{
		"id": 8,
		"name": "Almuerzos",
		"sublevels": [
			{
				"id": 9,
				"name": "Fake 5"
			},
			{
				"id": 10,
				"name": "Fake 6"
			}
		]
	},
	{
		"id": 11,
		"name": "Vinos",
		"sublevels": [
			{
				"id": 12,
				"name": "Fake 8"
			},
			{
				"id": 13,
				"name": "Fake 9"
			}
		]
	}
];

export class CategoryItemNode {
  children: CategoryItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class CategoryItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  dataChange = new BehaviorSubject<CategoryItemNode[]>([]);

  get data(): CategoryItemNode[] { return this.dataChange.value; }

  constructor(private http: HttpClient) {
    this.initialize();
  }

  initialize() {
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  buildFileTree(obj: {[key: string]: any}, level: number): CategoryItemNode[] {
    return Object.keys(obj).reduce<CategoryItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new CategoryItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(environment.categoriesApiUrl);
  }
}
