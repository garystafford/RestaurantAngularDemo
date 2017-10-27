export class OrderResponse {
  TimePlaced: string;
  OrderNumber: string;
  Message: string;

  constructor(timePlaced: string, orderNumber: string, message: string) {
    this.TimePlaced = timePlaced;
    this.OrderNumber = orderNumber;
    this.Message = message;
  }
}
