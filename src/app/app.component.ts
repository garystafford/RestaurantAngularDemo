import {Component, OnInit, NgModule} from '@angular/core';
import {MenuItemService} from './menu-item.service';
import {MenuItem} from './menu-item';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Order} from './order';
import {OrderItem} from './order-item';
import {OrderService} from './order.service';
import {HttpClient} from '@angular/common/http';
import {OrderResponse} from "./order-response";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuItemService, OrderService]
})

@NgModule({
  imports: [
    NgbModule
  ]
})

export class AppComponent implements OnInit {
  menu: MenuItem[];
  order: Order = new Order;
  totalOrder = 0;
  orderService: OrderService = new OrderService(this.http);
  orderResponseMessage: string;

  constructor(private menuItemService: MenuItemService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  onSubmit(): void {
    if (this.order.items.length > 0) {
      const orderResponse: OrderResponse = this.orderService.placeOrder(this.order);
      this.orderResponseMessage = 'Time Place:' + orderResponse.TimePlaced + '\n' +
      'Order Number:' + orderResponse.OrderNumber + '\n' +
      'Message:' + orderResponse.Message;
      this.order = new Order;
      this.totalOrder = 0.00;
    } else {
      this.orderResponseMessage = 'Please select some food, first.';
    }
  }

  onSelect(menuChoiceId: string, menuChoiceQuantity: string): void {
    if ((parseInt(menuChoiceId, 10) < 1) || (menuChoiceId === '')) {
      document.getElementById('select_item').focus();
      return;
    }

    if ((parseInt(menuChoiceQuantity, 10) < 1) || (menuChoiceQuantity === '')) {
      document.getElementById('select_quantity').focus();
      return;
    }

    const orderItem: OrderItem = this.addItemToOrder(menuChoiceId, menuChoiceQuantity);
    this.order.items.push(orderItem);
    this.calculateTotal();
    this.resetFormForNextOrderItem();
  }

  private getMenu(): void {
    this.menuItemService.getMenu()
      .then(menu => this.menu = menu)
      .then(menu => menu.sort((a, b) => a.description.localeCompare(b.description)));
  }

  removeOrderItem(rowIndex): void {
    this.order.items.splice(rowIndex, 1);
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.totalOrder = 0;
    for (const item of this.order.items) {
      this.totalOrder = this.totalOrder + item.subtotal;
    }
  }

  private resetFormForNextOrderItem(): void {
    (<HTMLInputElement>document.getElementById('select_quantity')).valueAsNumber = 0;
    (<HTMLSelectElement>document.getElementById('select_item')).selectedIndex = 0;
  }

  private addItemToOrder(menuChoiceId, menuChoiceQuantity): OrderItem {
    const menuChoice: MenuItem = this.menu.find(menuItem => menuItem.id === parseInt(menuChoiceId, 10));

    const orderItem: OrderItem = new OrderItem();
    orderItem.quantity = parseInt(menuChoiceQuantity, 10);
    orderItem.menuId = menuChoice.id;
    orderItem.description = menuChoice.description;
    orderItem.price = menuChoice.price;
    orderItem.subtotal = parseFloat((orderItem.quantity * orderItem.price).toFixed(2));

    return orderItem;
  }
}
