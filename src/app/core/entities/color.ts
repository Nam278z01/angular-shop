import { Size } from './size';

export class Color {
  public color_id: number;
  public color_name: string;
  public product_price: number;
  public sizes: Size[];
  public product_image1: string;
  public product_image2: string | null;
  public product_image3: string | null;
  public product_image4: string | null;
  public product_image5: string | null;

  constructor(color_id: number, color_name: string, product_price: number, sizes: Size[], product_image1: string, product_image2: string | null = null, product_image3: string | null = null, product_image4: string | null = null, product_image5: string | null = null) {
    this.color_id = color_id;
    this.color_name = color_name;
    this.product_price = product_price;
    this.sizes = sizes;
    this.product_image1 = product_image1;
    this.product_image2 = product_image2;
    this.product_image3 = product_image3;
    this.product_image4 = product_image4;
    this.product_image5 = product_image5;
  }

}
