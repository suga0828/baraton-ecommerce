import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../interfaces/product';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product> {
    return this.http.get<Product>(environment.productsApiUrl);
  }
}
