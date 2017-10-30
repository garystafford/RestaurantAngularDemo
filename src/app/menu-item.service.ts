import {Injectable} from '@angular/core';
import {IMenuItem} from './menu-item';
import {MENU} from './mock-menu-items';

@Injectable()
export class MenuItemService {
  getMenu(): Promise<IMenuItem[]> {
    return Promise.resolve(MENU);
  }
}
