import { Component, OnInit, Injector } from '@angular/core';

import { Product } from 'src/app/core/entities/product';
import { Color } from 'src/app/core/entities/color';
import { Size } from 'src/app/core/entities/size';
import { Utils } from './../../core/common/utils';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends Utils implements OnInit {
  product: Product;
  products: Product[];
  isLoading: boolean = true;
  isLoadingSub: boolean = true;
  show_warning: any = {};

  constructor(
   injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let product_id = params['product_id'];

      this.isLoading = true;
      this.isLoadingSub = true;

      this.getProduct(product_id);
    });
  }

  getProduct(product_id: string) {
    this._apiService
      .get<Product>(`/api/product/get-detail/${product_id}`)
      .subscribe((res: any) => {
        this.product = res;
        this.product.picked = {};
        this.product.picked.quantity = 1;
        this.changeColor(this.product, this.product.colors[0]);

        console.log(res);

        this.getProductBySubCategory(this.product);
        this.isLoading = false;
      });
  }

  changeColor(product: Product, color: Color) {
    //Giữ size
    let index;
    if (product.picked.size) {
      index = product.picked.color.sizes.findIndex(
        (size: any) => size.size_id == product.picked.size.size_id
      );
      this.changeSize(product, color.sizes[index]);
    }
    product.picked.color = color;
  }

  changeSize(product: Product, size: Size) {
    product.picked.quantity = 1;
    product.picked.size = size;
    this.validateQuantity(this.product);
  }

  increase() {
    if (!this.product.picked.size) {
      this.show_warning.size = true;
      // return false;
    } else {
      if (this.product.picked.quantity < this.product.picked.size.quantity) {
        this.product.picked.quantity++;
        this.validateQuantity(this.product);
      }
    }
  }

  decrease() {
    if (!this.product.picked.size) {
      this.show_warning.size = true;
      // return false;
    } else {
      if (this.product.picked.quantity > 1) {
        this.product.picked.quantity--;
        this.validateQuantity(this.product);
      }
    }
  }

  validateQuantity(product: Product) {
    if (product.picked.size) {
      this.getQuantityOfSize(product.picked.size).subscribe((res: any) => {
        product.picked.size.quantity = res.quantity;
        if (
          product.picked.size &&
          product.picked.size.quantity < product.picked.quantity
        ) {
          product.picked.quantity = product.picked.size.quantity;
          // $rootScope.showSnackbar(
          //     `Sản phẩm này chỉ còn tối đa ${product.picked.size.quantity} cái!`
          // );
        }
        if (!product.picked.quantity) {
          product.picked.quantity = 1;
        }
      });
    }
  }

  getQuantityOfSize(size: Size) {
    return this._apiService.get<any>(
      `/api/product/get-quantity/${size.size_id}`
    );
  }

  getProductBySubCategory(product: Product) {
    this._apiService
      .get<Product>(`/api/product/get-by-subcategory/${product.subcategory_id}/${product.product_id}`)
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
