import { Component, Injector } from '@angular/core';

import { Utils } from './core/common/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Utils {
  title = 'angular-shop';

  is_show_modal_login: boolean = false;
  is_login: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    // console.log('auth', this._authService.isAuthenticated())
    this.is_login = this._authService.isAuthenticated();
  }

  showModalLogin(value: boolean) {
    this.is_show_modal_login = value;
  }
}
