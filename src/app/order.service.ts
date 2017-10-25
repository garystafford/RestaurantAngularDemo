import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor() { }

  placeOrder(): string {
    return 'foo';
  }
}
