import {Component, OnInit, NgModule} from '@angular/core';
import {MenuItemService} from './menu-item.service';
import {MenuItem} from './menu-item';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Order} from './order';
import {OrderItem} from './order-item';
import {OrderService} from './order.service';

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
  orderService: OrderService = new OrderService;
  orderResponse = '...';

  constructor(private menuItemService: MenuItemService) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  onSubmit(): void {
    if (this.order.orderItems.length > 0) {
      this.orderResponse = this.orderService.placeOrder(this.order, this.totalOrder);
    } else {
      this.orderResponse = 'Please select some items before placing your order.';
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
    this.order.orderItems.push(orderItem);
    this.calculateTotal();

    // console.log(orderItem);
    // console.log(this.order.orderItems.length);

    this.resetFormForNextOrderItem();
  }

  getMenu(): void {
    this.menuItemService.getMenu()
      .then(menu => this.menu = menu)
      .then(menu => menu.sort((a, b) => a.description.localeCompare(b.description)));
  }

  private calculateTotal() {
    this.totalOrder = 0;
    for (const item of this.order.orderItems) {
      this.totalOrder = this.totalOrder + item.subtotal;
    }
  }

  public removeOrderItem(rowIndex) {
    this.order.orderItems.splice(rowIndex, 1);
    this.calculateTotal();
  }

  private resetFormForNextOrderItem() {
    (<HTMLInputElement>document.getElementById('select_quantity')).valueAsNumber = 0;
    (<HTMLSelectElement>document.getElementById('select_item')).selectedIndex = 0;
  }

  private addItemToOrder(menuChoiceId, menuChoiceQuantity): OrderItem {
    const menuChoice: MenuItem = this.menu.find(menuItem => menuItem.id === parseInt(menuChoiceId, 10));

    const orderItem: OrderItem = new OrderItem();
    orderItem.quantity = parseInt(menuChoiceQuantity, 10);
    orderItem.id = menuChoice.id;
    orderItem.description = menuChoice.description;
    orderItem.price = menuChoice.price;
    orderItem.subtotal = parseFloat((orderItem.quantity * orderItem.price).toFixed(2));

    return orderItem;
  }
}
