import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {IOrderResponse} from './order-response';
import {MenuItemService} from './menu-item.service';
import {MenuItem} from './menu-item';
import {Order} from './order';
import {OrderItem} from './order-item';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuItemService]
})

export class AppComponent implements OnInit {
  menu: MenuItem[];
  order: Order = new Order;
  totalOrder = 0;
  orderResponse: IOrderResponse;

  constructor(private menuItemService: MenuItemService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  onSubmit(): void {
    if (this.order.items.length > 0) {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.post<IOrderResponse>(`${environment.apiOrderRoot}/orders`, this.order, {headers: headers, observe: 'response'})
        .retry(1)
        .subscribe(res => {
            this.orderResponse = res.body;
            this.orderResponse.TimePlaced = (new Date(Date.parse(this.orderResponse.TimePlaced))).toLocaleTimeString();
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
          });

      this.order = new Order;
      this.totalOrder = 0.00;
    } else {
      this.orderResponse.TimePlaced = '';
      this.orderResponse.OrderNumber = '';
      this.orderResponse.Message = 'Please select some food, first.';
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
