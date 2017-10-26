import {Injectable} from '@angular/core';
import {Order} from './order';

@Injectable()
export class OrderService {

  constructor() {
  }

  placeOrder(order: Order, totalOrder: number): string {
    return 'Order placed...';
  }
}
