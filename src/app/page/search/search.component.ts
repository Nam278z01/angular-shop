import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';

import { Product } from 'src/app/core/entities/product';
import { Utils } from './../../core/common/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends Utils implements OnInit {
  searchParams: any = {};
  products: Product[] = [];
  total_row: number;
  loading: boolean = true;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // console.log(params);
      this.searchParams = {
        page: params['page'] || 1,
        page_size: params['page_size'] || 20,
        category_id: params['category_id'],
        list_subcategory_id: params['list_subcategory_id'],
        text_search: params['text_search'],
        min_price: params['min_price'],
        max_price: params['max_price'],
        sort: Number(params['sort']) || 1,
      };

      this.getProduct();
    });
  }

  changeSort() {
    this.searchParams.page = 1;
    this.router.navigate(['/search'], { queryParams: this.searchParams });
    return undefined;
  }

  getProduct() {
    this.loading = true;
    this._apiService
      .get<any>('/api/product/search', this.searchParams)
      .subscribe((res: any) => {
        this.products = res.data || [];
        this.products.forEach((product: Product) => {
          product.picked = {};
          product.picked.color = product.colors[0];
        });
        this.total_row = res.total_row;

        this.loading = false;
        console.log(this.products);
      });
  }

  pageChanged(newPage: number) {
    this.searchParams.page = newPage;
    this.router.navigate(['/search'], { queryParams: this.searchParams });
  }
}
