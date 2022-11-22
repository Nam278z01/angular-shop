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
}
