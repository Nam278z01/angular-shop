import { Color } from "./color";

export class Product {
  public product_id: number;
  public product_name: string;
  public product_discount: number;
  public quantity_sold: number;
  public max_price: number;
  public min_price: number;
  public colors: Color[];
  public color_current: Color;
}
