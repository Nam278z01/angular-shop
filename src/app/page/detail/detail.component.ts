import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

import { Product } from 'src/app/core/entities/product';
import { Color } from 'src/app/core/entities/color';
import { Size } from 'src/app/core/entities/size';
import { Utils } from './../../core/common/utils';
import { Cart } from 'src/app/core/entities/cart';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends Utils implements OnInit, OnDestroy {
  thumbsSwiper: any;

  product: Product;
  products: Product[];
  isLoading: boolean = true;
  isLoadingSub: boolean = true;
  show_warning: any = {};
  cart: Cart[];
  subscriptions: Subscription[] = [];
  isAdding: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    // Reload component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.queryParams.subscribe((params) => {
      let product_id = params['product_id'];

      this.isLoading = true;
      this.isLoadingSub = true;

      this.getProduct(product_id);
    });

    this.subscriptions.push(
      this._cartService.cart$.subscribe((res: Cart[]) => {
        this.cart = res;
        console.log('cart from detail');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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

  addToCartInDetailsPage(product: Product) {
    if (!this.isAdding) {
      this.isAdding = true;

      let cart = JSON.parse(this._storageService.getItem('CART') || '[]');

      let product_new = JSON.parse(JSON.stringify(product));
      product_new.cart_id = Math.floor(Date.now() * Math.random());
      if (product_new.picked.size) {
        if (product_new.picked.size.quantity != 0) {
          this._apiService
            .post('/api/cart2', {
              cart: cart,
              product: {
                cart_id: product_new.cart_id,
                product_id: product_new.product_id,
                size_id: product_new.picked.size.size_id,
                quantity: product_new.picked.quantity,
              },
            })
            .subscribe((res: any) => {
              if (res.status == 'success') {
                this._storageService.setItem('CART', res.cart);

                let index = this.cart.findIndex(
                  (p) => p.picked.size.size_id == product_new.picked.size.size_id
                );
                index != -1
                  ? (this.cart[index].picked.quantity +=
                      product_new.picked.quantity)
                  : this.cart.unshift(product_new);

                this.toastr.success('Thêm vào giỏ thành công!');
                this._cartService.sendCart(this.cart);
                this._cartService.recalculateTotalPrice();
              } else {
                this.toastr.warning('Số lượng sản phẩm vừa thêm và trong giỏ đã vượt quá số lượng tồn kho!');
              }
              product.picked.size.quantity = res.quantity_in_stock;
              this.isAdding = false;
            });
        } else {
          this.toastr.warning('Sản phẩm đã hết hàng!');
          this.isAdding = false;
        }
      } else {
        this.show_warning.size = true;
        this.isAdding = false;
      }
    }
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
          this.toastr.warning(`Sản phẩm này chỉ còn tối đa ${product.picked.size.quantity} cái!`);
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
