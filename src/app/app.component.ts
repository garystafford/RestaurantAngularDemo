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
    this.addOrderItemToTable(orderItem);

    console.log(orderItem);
    console.log(this.order.orderItems.length);

    this.resetFormForNextOrderItem();
  }

  private addOrderItemToTable(orderItem: OrderItem) {
    const orderTableBody = (<HTMLTableSectionElement>document.getElementById('order_table_body'));
    const newRowAsString =
      '<td class="text-center">' + orderItem.quantity + '</td>' +
      '<td class="text-left">' + orderItem.description + '</td>' +
      '<td class="text-right">$' + orderItem.price + '</td>' +
      '<td class="text-right">$' + orderItem.subtotal + '</td>' +
      '<td class="text-center"><button class="btn btn-danger btn-sm">Remove</button>' +
      '</td>';

    const newRow = orderTableBody.insertRow(0);

    const tr = document.createElement('tr');
    tr.innerHTML = newRowAsString;
    orderTableBody.appendChild(tr);
  }

  private resetFormForNextOrderItem() {
    (<HTMLInputElement>document.getElementById('select_quantity')).valueAsNumber = 0;
    (<HTMLSelectElement>document.getElementById('select_item')).selectedIndex = 0;
  }

  private addItemToOrder(menuChoiceId: string, menuChoiceQuantity: string): OrderItem {
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
