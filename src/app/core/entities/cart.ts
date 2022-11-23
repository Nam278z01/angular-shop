import { Color } from "./color";

export class Cart {
  public cart_id: number;
  public chose: boolean;
  public quantity: number;
  public size_id: number;
  public product_id: number;
  public product_name: string;
  public product_discount: number;
  public quantity_sold: number;
  public max_price: number;
  public min_price: number;
  public colors: Color[];
  public picked: any;
  public subcategory: any;
  public subcategory_id: number;
}
