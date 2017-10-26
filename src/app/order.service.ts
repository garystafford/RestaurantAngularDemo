import {Injectable} from '@angular/core';
import {Order} from './order';

@Injectable()
export class OrderService {

  constructor() {
  }

  placeOrder(order: Order): string {
    return 'Order placed...';
  }
}
