export class OrderResponse {
  OrderDateTime: string;
  OrderNumber: string;
  OrderMessage: string;

  constructor(orderDateTime: string, orderNumber: string, orderMessage: string) {
    this.OrderDateTime = orderDateTime;
    this.OrderNumber = orderNumber;
    this.OrderMessage = orderMessage;
  }
}
