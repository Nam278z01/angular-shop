import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/core/services/api.service';
import { Category } from './../../../core/entities/category';
import { DataService } from './../../../core/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categories: Category[];
  text_search: string | undefined;
  searchParams: any;

  constructor(
    private _apiService: ApiService,
    private _dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._apiService
      .get<Category[]>('/api/category/get-all')
      .subscribe((res: any) => {
        this.categories = res;
        this._dataService.sendCategories(this.categories);
        // console.log(this.categories);
      });
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
}
