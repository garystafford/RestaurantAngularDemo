import {Component, OnInit, NgModule} from '@angular/core';
import {MenuItemService} from './menu-item.service';
import {MenuItem} from './menu-item';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuItemService],
})
export class AppComponent implements OnInit {
  title = 'app';
  menu: MenuItem[];

  constructor(private menuItemService: MenuItemService) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {
    this.menuItemService.getMenu().then(menu => this.menu = menu);
  }
}
