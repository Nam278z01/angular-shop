import { Component, EventEmitter, Input, OnInit, Output, Injector } from '@angular/core';

import { Utils } from './../../../core/common/utils';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Utils implements OnInit {
  @Output() showLoginEvent = new EventEmitter<boolean>();
  @Input() is_show_modal_login: boolean;

  email: string;
  password: string;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  showModalLogin() {
    this.showLoginEvent.emit(!this.is_show_modal_login)
  }

  login() {
    this._authService.login(this.email, this.password).subscribe(res => {
      this._storageService.setItem('CURRENT_CUSTOMER', res)
      window.location.reload();
    })
  }
}
