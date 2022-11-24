import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { StorageService } from './storage.service';
import { Cart } from '../entities/cart';
import { ApiService } from './api.service';
import { Product } from './../entities/product';
import { Size } from './../entities/size';
import { Color } from '../entities/color';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<Cart[]>([]);
  cart$ = this.cart.asObservable();

  private total_price = new BehaviorSubject<number>(0);
  total_price$ = this.total_price.asObservable();

  private clonedCart: Cart[];

  constructor(
    private _apiService: ApiService,
    private _storageService: StorageService,
    private toastr: ToastrService
  ) {
    this.getCart();

    this.cart$.subscribe((res: Cart[]) => {
      this.clonedCart = JSON.parse(JSON.stringify(res));
    })
  }

  sendCart(cart: Cart[]) {
    this.cart.next(cart);
  }

  getCart() {
    let cart = JSON.parse(this._storageService.getItem('CART') || '[]');

    this._apiService.post('/api/cart2/get-all', cart).subscribe((res: any) => {
      res.forEach((product: Cart) => {
        product.picked = {};
        product.picked.quantity = product.quantity;
        product.colors.forEach((color) => {
          color.sizes.forEach((size) => {
            if (product.size_id == size.size_id) {
              product.picked.color = color;
              product.picked.size = size;
            }
          });
        });
      });

      this.recalculateTotalPrice();

      this.cart.next(res);
    });
  }

  addToCartInProductPage(product: Product, size: Size) {
    let cart = JSON.parse(this._storageService.getItem('CART') || '[]');

    let product_new = JSON.parse(JSON.stringify(product)) as Cart;
    product_new.cart_id = Math.floor(Date.now() * Math.random());
    product_new.picked.size = size;
    product_new.picked.quantity = 1;
    product_new.chose = false;
    if (product_new.colors.length == 1) {
      product_new.picked.color = product_new.colors[0];
    }

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

            let index = this.clonedCart.findIndex(
              (p) => p.picked.size.size_id == product_new.picked.size.size_id
            );

            index != -1
              ? (this.clonedCart[index].picked.quantity += product_new.picked.quantity)
              : this.clonedCart.unshift(product_new);

            this.cart.next(this.clonedCart);
            this.recalculateTotalPrice();

            this.toastr.success('Thêm vào giỏ thành công!');
          } else {
            this.toastr.warning('Số lượng sản phẩm vừa thêm và trong giỏ đã vượt quá số lượng tồn kho!');
          }
          size.quantity = res.quantity_in_stock;
        });
    } else {
      this.toastr.warning('Sản phẩm đã hết hàng!');
    }
  }

  editCart(product: Cart, product_old: Cart | undefined = undefined) {
    // console.log(product)
    let cart = JSON.parse(this._storageService.getItem('CART') || '[]');

    if (!product.picked.quantity) {
      product.picked.quantity = 1;
    }

    this._apiService
      .put(`/api/cart2/${product.cart_id}`, {
        cart: cart,
        product: {
          product_id: product.product_id,
          size_id: product.picked.size.size_id,
          quantity: product.picked.quantity,
        }
      })
      .subscribe((res: any) => {
        if (res.status == 'success') {
          this._storageService.setItem('CART', res.cart);

          this.recalculateTotalPrice();
          product.picked.size.quantity = res.quantity_in_stock;
        } else {
          if (res.quantity_in_stock) {
            this.toastr.warning(`Sản phẩm này chỉ còn tối đa ${res.data.quantity_in_stock} cái!`);
          } else {
            this.toastr.warning('Sản phẩm này đã hết hàng!');
          }

          if (typeof product_old === 'object') {

            product_old.colors.forEach(function (color: Color) {
              if (color.color_id == product_old.picked.color.color_id) {
                product_old.picked.color = color;
                product_old.picked.color.sizes.forEach(function (size: Size) {
                  if (size.size_id == product_old.picked.size.size_id) {
                    product_old.picked.size = size;
                  }
                });
              }
            });

            product_old.picked.quantity = res.quantity_in_cart;
            product_old.picked.size.quantity = res.quantity_in_stock;

            let index = this.clonedCart.findIndex(
              (p) => p.product_id === product_old.product_id
            );

            this.clonedCart[index] = product_old;

            this.cart.next(this.clonedCart);
          }
        }
      });
  }

  removeProductFromCart(cart_id: number) {
    let cart = JSON.parse(this._storageService.getItem('CART') || '[]');

    let new_cart = cart.filter((product: any) => {
      return product.cart_id != cart_id;
    });

    this._storageService.setItem('CART', new_cart);

    let new_cart2 = this.clonedCart.filter((product) => {
      return product.cart_id != cart_id;
    });

    this.cart.next(new_cart2);
    this.recalculateTotalPrice();
  };

  changeColorInCart($event: any, product: Cart, index_product: number) {
    let product_backup = JSON.parse(JSON.stringify(this.clonedCart[index_product]));
    // console.log(product)
    // console.log($event)
    product.picked.color = product.colors.filter(color => color.color_id == $event)[0];
    // console.log(product)
    // console.log(product_backup)
    //Giữ size
    let index;
    if (product.picked.size) {
      index = product_backup.picked.color.sizes.findIndex(
        (size: any) => size.size_id == product_backup.picked.size.size_id
      );
      product.picked.size = product.picked.color.sizes[index];
    }
    product.picked.quantity = 1;
    this.editCart(product, product_backup);
  }

  changeSizeInCart($event: any, product: Cart, index_product: number) {
    let product_backup = JSON.parse(JSON.stringify(this.clonedCart[index_product]));
    product.colors.forEach(color => {
      color.sizes.forEach(size => {
        if (size.size_id = $event) {
          product.picked.size = size;
        }
      })
    });
    // console.log($event)
    // console.log(product)
    // console.log(product_backup)
    // console.log(product.picked)
    // console.log(product.picked.color)
    // console.log(product.picked.size)

    product.picked.quantity = 1;
    this.editCart(product, product_backup);
  }

  increaseInCart(product: Cart) {
    if (product.picked.quantity < product.picked.size.quantity) {
      product.picked.quantity++;
      this.editCart(product);
    } else {
      this.toastr.warning(`Sản phẩm này chỉ còn tối đa ${product.picked.size.quantity} cái!`);
    }
  }

  decreaseInCart(product: Cart) {
    if (product.picked.quantity > 1) {
      product.picked.quantity--;
      this.editCart(product);
    }
  }

  validateNumber(e: any, product: Product) {
    if (product.picked.size) {
      const pattern = /^[0-9]$/;
      if (!pattern.test(e.key)) {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  }

  validateNumber2(e: any) {
    const pattern = /^[0-9]$/;
    if (!pattern.test(e.key)) {
        e.preventDefault();
    }
  };

  recalculateTotalPrice() {
    this.cart.subscribe((res: Cart[]) => {
      let total_price = res
        .filter((product) => product.chose)
        .reduce(function (total, current) {
          return (
            total +
            (current.picked.color.product_price -
              (current.picked.color.product_price * current.product_discount) /
                100) *
              current.picked.quantity
          );
        }, 0);

      this.total_price.next(total_price);
    });
  }

}
