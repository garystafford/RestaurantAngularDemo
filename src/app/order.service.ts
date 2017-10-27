import {Injectable} from '@angular/core';
import {Response, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from './order';
import {OrderResponse} from './order-response';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  placeOrder(order: Order): string {
    this.postOrder(order);
    return 'Order sent!';
  }

  private postOrder(order: Order): Observable<OrderResponse> {
    let orderResponse = null;
    // const headers = new Headers({'Content-Type': 'application/json'});
    // const options = new RequestOptions({headers: HttpHeaders});
    const req = this.http.post('http://restaurantwebapi20171026011740.azurewebsites.net/api/orders', order, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(res => orderResponse = res);

    return orderResponse;

    // return orderResponse.map(obj => {
    //   return new OrderResponse(
    //     obj.OrderDateTime,
    //     obj.OrderNumber,
    //     obj.OrderMessage
    //   );
    // });
  }
}
