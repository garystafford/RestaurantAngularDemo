import {Component, OnInit} from '@angular/core';
import {MenuService} from './menu.service';
import {Menu} from './menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuService]
})
export class AppComponent implements OnInit {
  title = 'app';
  menu: Menu[];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {
    this.menuService.getMenu().then(menu => this.menu = menu);
  }
}
