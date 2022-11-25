import { Component, Injector, OnInit } from "@angular/core";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs, Pagination, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination, Autoplay]);

import { Utils } from './../../core/common/utils';
import { Product } from "src/app/core/entities/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends Utils implements OnInit {

  isLoadingSub: boolean = true;
  products: Product[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {

    let product = new Product();
    product.subcategory_id = 26;
    product.product_id = 83;

    this.getProductBySubCategory(product);
  }

  getProductBySubCategory(product: Product) {
    this._apiService
      .get<Product>(
        `/api/product/get-by-subcategory/${product.subcategory_id}/${product.product_id}`
      )
      .subscribe((res: any) => {
        this.products = res;
        if (this.products) {
          this.products.forEach((product) => {
            product.picked = {};
            product.picked.color = product.colors[0];
          });
        }
        console.log(res);
        this.isLoadingSub = false;
      });
  }

}
