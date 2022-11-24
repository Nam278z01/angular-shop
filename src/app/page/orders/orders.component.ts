import { Component, OnInit, Injector } from '@angular/core';

import { Utils } from 'src/app/core/common/utils';
import { Customer } from 'src/app/core/entities/customer';

@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends Utils implements OnInit {
  customer: Customer;
  order_state: number = -1;
  text_search_order: string = '';
  orders: any[] = [];
  clonedOrders: any[];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._dataService.customer$.subscribe((res) => (this.customer = res));

    this.getOrders();
  }

  setOrderState(order_state: number) {
    console.log(order_state);
    this.order_state = order_state;

    this.searchOrders();
  }

  getOrders() {
    this._apiService.get<any>('/api/order').subscribe((res: any) => {
      this.orders = res;
      this.orders.forEach((order) => {
        order.order_state_current =
          order.orderstates[order.orderstates.length - 1];
      });
      this.clonedOrders = this.orders;
    });
  }

  searchOrders() {
    this.orders = this.clonedOrders
      .filter((order) => {
        let check: boolean = false;
        if (order.order_id == this.text_search_order) {
          check = true;
        }

        if (this.text_search_order == '') {
          check = true;
        }

        order.orderdetails.forEach((element: any) => {
          let product_name: string = element.size.color.product.product_name;
          if (
            product_name
              .toUpperCase()
              .includes(this.text_search_order.toUpperCase())
          ) {
            check = true;
          }
        });

        return check;
      })
      .filter((order: any) => {
        if (this.order_state == -1) {
          return true;
        }
        return order.order_state_current.orderstate_name == this.order_state;
      });
  }
}
