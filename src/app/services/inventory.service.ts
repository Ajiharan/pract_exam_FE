import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iParams } from '../core/model/param';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(paramsData: iParams, productName = ''): Observable<any> {
    const params = new HttpParams()
      .set('limit', paramsData.limit)
      .set('offset', paramsData.offset)
      .set('productName', productName);
    return this.http.get(`${this.BASE_URL}/product/lists`, { params });
  }

  getPurchases(paramsData: iParams, productName = ''): Observable<any> {
    const params = new HttpParams()
      .set('limit', paramsData.limit)
      .set('offset', paramsData.offset)
      .set('productName', productName);
    return this.http.get(`${this.BASE_URL}/purchase/lists`, { params });
  }

  getOrders(paramsData: iParams, productName = ''): Observable<any> {
    const params = new HttpParams()
      .set('limit', paramsData.limit)
      .set('offset', paramsData.offset)
      .set('productName', productName);
    return this.http.get(`${this.BASE_URL}/order/lists`, { params });
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/product/create`, data);
  }
}
