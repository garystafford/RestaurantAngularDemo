import {Component, OnInit, NgModule} from '@angular/core';
import {MenuItemService} from './menu-item.service';
import {MenuItem} from './menu-item';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Order} from './order';
import {OrderItem} from './order-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuItemService]
})

@NgModule({
  imports: [
    NgbModule
  ]
})

export class AppComponent implements OnInit {
  title = 'app';
  menu: MenuItem[];
  order: Order = new Order;

  constructor(private menuItemService: MenuItemService) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  onSelect(menuChoiceId: string, menuChoiceQuantity: string): void {
    const orderItem: OrderItem = this.addToOrder(menuChoiceId, menuChoiceQuantity);
    this.order.orderItems.push(orderItem);
    console.log(orderItem);
    console.log(this.order.orderItems.length);
  }

  private addToOrder(menuChoiceId: string, menuChoiceQuantity: string): OrderItem {
    const menuChoice: MenuItem = this.menu.find(menuItem => menuItem.id === parseInt(menuChoiceId, 10));
    const orderItem: OrderItem = new OrderItem();
    orderItem.quantity = parseInt(menuChoiceQuantity, 10);
    orderItem.id = menuChoice.id;
    orderItem.description = menuChoice.description;
    orderItem.price = menuChoice.price;
    orderItem.subtotal = parseFloat((orderItem.quantity * orderItem.price).toFixed(2));

    return orderItem;
  }

  getMenu(): void {
    this.menuItemService.getMenu()
      .then(menu => this.menu = menu)
      .then(menu => menu.sort((a, b) => a.description.localeCompare(b.description)));
  }
}
