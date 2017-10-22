import {Component, OnInit, NgModule} from '@angular/core';
import {MenuItemService} from './menu-item.service';
import {MenuItem} from './menu-item';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DropdownModule} from 'ng2-dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuItemService]
})

@NgModule({
  imports: [
    NgbModule,
    DropdownModule
  ]
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
