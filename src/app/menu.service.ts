import {Injectable} from '@angular/core';

import {Menu} from './menu';
import {MENU} from './mock-menu';

@Injectable()
export class MenuService {
  getMenu(): Promise<Menu[]> {
    return Promise.resolve(MENU);
  }
}
