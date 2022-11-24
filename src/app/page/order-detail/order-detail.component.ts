import { Component, OnInit, Injector } from '@angular/core';

import { Utils } from './../../core/common/utils';
import { Customer } from 'src/app/core/entities/customer';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent extends Utils implements OnInit {

  customer: Customer;
  order: any;
  order_id: string;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._dataService.customer$.subscribe(res => this.customer = res);
    this.route.queryParams.subscribe((params) => {
      this.order_id = params['order_id']
      this.getOrder(this.order_id);
    });
  }

  getOrder(order_id: string) {
    this._apiService.get<any>(`/api/order/${order_id}`).subscribe((res: any) => {
      this.order = res;
    })
  }

  updateOrderState(order_state_name: number) {
    this._apiService.put(`/api/order/${this.order_id}`, {
      orderstate_name: order_state_name
    }).subscribe((res: any) => {
      this.order.orderstates.push(res);
      if (order_state_name == 3) {
        this.toastr.success('Hủy đơn hàng thành công!');
      } else {
        this.toastr.success('Hoàn trả đơn hàng thành công!');
      }
    })
  }
}
