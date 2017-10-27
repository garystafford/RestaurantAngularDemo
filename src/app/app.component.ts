import {Component, OnInit, NgModule} from '@angular/core';
import {MenuItemService} from './menu-item.service';
import {MenuItem} from './menu-item';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Order} from './order';
import {OrderItem} from './order-item';
import {OrderService} from './order.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


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
  orderResponse = 'Please select some items.';

  constructor(private menuItemService: MenuItemService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  onSubmit(): void {
    if (this.order.items.length > 0) {
      this.orderResponse = this.orderService.placeOrder(this.order);
      // const req = this.http.post('http://localhost:56478/api/orders', this.order, { headers: new HttpHeaders()
      //   .set('Content-Type', 'application/json')}).subscribe(data => console.log(data));

      this.order = new Order;
      this.totalOrder = 0.00;
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
    this.order.items.push(orderItem);
    this.calculateTotal();
    this.resetFormForNextOrderItem();

    // console.log(orderItem);
    // console.log(this.order.orderItems.length);
  }

  getMenu(): void {
    this.menuItemService.getMenu()
      .then(menu => this.menu = menu)
      .then(menu => menu.sort((a, b) => a.description.localeCompare(b.description)));
  }

  private calculateTotal() {
    this.totalOrder = 0;
    for (const item of this.order.items) {
      this.totalOrder = this.totalOrder + item.subtotal;
    }
  }

  public removeOrderItem(rowIndex) {
    this.order.items.splice(rowIndex, 1);
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
    orderItem.menuId = menuChoice.id;
    orderItem.description = menuChoice.description;
    orderItem.price = menuChoice.price;
    orderItem.subtotal = parseFloat((orderItem.quantity * orderItem.price).toFixed(2));

    return orderItem;
  }
}
