import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../interfaces/category';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(environment.categoriesApiUrl)
    .pipe(
      map( data => data.categories)
    );
  }
}
