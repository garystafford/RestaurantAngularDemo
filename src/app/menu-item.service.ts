import {Injectable} from '@angular/core';

import {MenuItem} from './menu-item';
import {MENU} from './mock-menu-items';

@Injectable()
export class MenuItemService {
  getMenu(): Promise<MenuItem[]> {
    return Promise.resolve(MENU);
  }
}
