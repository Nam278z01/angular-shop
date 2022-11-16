import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/core/services/api.service';
import { Category } from './../../../core/entities/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public categories: Category[];

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this._apiService.get<Category[]>('/api/category/get-all').subscribe((res: any) => {
      this.categories = res;
    })
  }

}
