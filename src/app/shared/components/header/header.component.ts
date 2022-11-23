import { Component, EventEmitter, Input, OnInit, Output, Injector } from '@angular/core';

import { Category } from './../../../core/entities/category';
import { Customer } from 'src/app/core/entities/customer';
import { Cart } from 'src/app/core/entities/cart';
import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends Utils implements OnInit {
  @Output() showLoginEvent = new EventEmitter<boolean>();
  @Input() is_show_modal_login: boolean;
  @Input() is_login: boolean;

  categories: Category[];
  text_search: string | undefined;
  searchParams: any;
  customer: Customer;
  cart: Cart[];
  isShowCart: boolean = false;

  constructor(
   injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._apiService
      .get<Category[]>('/api/category/get-all')
      .subscribe((res: any) => {
        this.categories = res;
        this._dataService.sendCategories(this.categories);
        // console.log(this.categories);
      });

    this._dataService.customer$.subscribe(res => this.customer = res);

    this._cartService.cart$.subscribe((res: Cart[]) => {
      this.cart = res;
    })
  }

  search() {
    // console.log(this.text_search)
    if (this.router.url.split('?')[0] == '/search') {
      this.route.queryParams.subscribe((params) => {
        // console.log(params);
        this.searchParams = {
          page: params['page'] || 1,
          page_size: params['page_size'] || 20,
          category_id: params['category_id'],
          list_subcategory_id: params['list_subcategory_id'],
          text_search: this.text_search,
          min_price: params['min_price'],
          max_price: params['max_price'],
          sort: Number(params['sort']) || 1,
        };

        this.router.navigate(['/search'], {
          queryParams: this.searchParams,
        });
      });
    } else {
      this.router.navigate(['/search'], {
        queryParams: { text_search: this.text_search },
      });
    }
  }

  showModalLogin() {
    this.showLoginEvent.emit(!this.is_show_modal_login)
  }

  logout() {
    this._authService.logout();
  }
}
