import {Injectable} from '@angular/core';
import {Response, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from './order';
import {IOrderResponse} from './order-response';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class OrderService {

  private _apiRoot = 'http://restaurantwebapi20171026011740.azurewebsites.net/api/orders';

  constructor(private http: HttpClient) {
  }

  // placeOrder(order: Order): Observable<IOrderResponse> {
  //   let orderResponse: Observable<IOrderResponse>;
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // this.http.post<IOrderResponse>(this._apiRoot, order, {headers: headers, observe: 'response'})
    //   .subscribe(res => {
    //     console.log(res.body);
    //     orderResponse = res.body;
    //   });
  //   return orderResponse;
  // }
}
