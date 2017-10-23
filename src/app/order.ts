import {OrderItem} from './order-item';

export class Order {
  id: number;
  orderItems: OrderItem[];

  constructor() {
    this.orderItems = [];
  }
}
