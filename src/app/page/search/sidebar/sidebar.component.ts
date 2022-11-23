import { Component, Input, OnInit, Injector } from '@angular/core';

import { Category } from './../../../core/entities/category';
import { SubCategory } from 'src/app/core/entities/sub-category';
import { Utils } from './../../../core/common/utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: { class: 'w-[205px] pr-[15px] pb-[10px]' },
})
export class SidebarComponent extends Utils implements OnInit {
  @Input() searchParams: any;
  categories: Category[];
  subcategories: SubCategory[] = [];

  constructor(
   injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._dataService.categories$.subscribe((item: Category[]) => {
      this.categories = item;
      // console.log(this.categories);

      this.route.queryParams.subscribe((params) => {
        if (this.categories.length > 0) {
          this.getSubCategories();
        }
      });
    });

    this.route.queryParams.subscribe((params) => {
      if (this.categories.length > 0) {
        this.getSubCategories();
      }
    });

    // console.log('url', this.router.url.split('?')[0] )
    // console.log('searchParams', this.searchParams);
  }

  getSubCategories() {
    if (
      this.searchParams.category_id &&
      this.router.url.split('?')[0] == '/search'
    ) {
      console.log('categories', this.categories);
      console.log(
        'category',
        this.categories.filter(
          (category) => category.category_id == this.searchParams.category_id
        )[0]
      );
      this.subcategories = this.categories.filter(
        (category) => category.category_id == this.searchParams.category_id
      )[0].subcategories;

      this.subcategories.forEach((subcategory: SubCategory) => {
        if (this.searchParams.list_subcategory_id) {
          subcategory.checked = JSON.parse(
            this.searchParams.list_subcategory_id
          ).includes(subcategory.subcategory_id)
            ? true
            : false;
        } else {
          subcategory.checked = false;
        }
      });

      console.log('subcategories', this.subcategories);
    }
  }

  changeCategory(
    category_id: number | undefined,
    type: boolean,
    category: Category | null
  ) {
    if (type) {
      return (
        this.searchParams.category_id == category_id &&
        this.router.url.split('?')[0] == '/search'
      );
    } else {
      this.searchParams.page = 1;
      this.searchParams.category_id = category_id;
      this.searchParams.list_subcategory_id = undefined;
      this.router.navigate(['/search'], { queryParams: this.searchParams });
      return undefined;
    }
  }

  changeSubCategories(subcategory: SubCategory) {
    if (subcategory.checked) {
      let arr = JSON.parse(this.searchParams.list_subcategory_id).filter(
        (subcategory_id: any) => {
          return subcategory_id != subcategory.subcategory_id;
        }
      );
      this.searchParams.list_subcategory_id =
        arr.length > 0 ? JSON.stringify(arr) : undefined;
      subcategory.checked = false;
    } else {
      let arr = this.searchParams.list_subcategory_id
        ? JSON.parse(this.searchParams.list_subcategory_id)
        : [];
      this.searchParams.list_subcategory_id = JSON.stringify([
        ...arr,
        subcategory.subcategory_id,
      ]);
      subcategory.checked = true;
    }

    this.searchParams.page = 1;
    this.router.navigate(['/search'], { queryParams: this.searchParams });
  }

  changePrice() {
    // console.log(this.searchParams.min_price)
    this.searchParams.page = 1;
    this.searchParams.min_price = this.searchParams.min_price
      ? this.searchParams.min_price
      : undefined;
    this.searchParams.max_price = this.searchParams.max_price
      ? this.searchParams.max_price
      : undefined;
    this.router.navigate(['/search'], { queryParams: this.searchParams });
  }
}
