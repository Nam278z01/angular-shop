import { SubCategory } from './sub-category';

export class Category {
  public category_id: number;
  public category_name: string;
  public subcategories: SubCategory[];

  constructor(category_id: number, category_name: string, subcategories: SubCategory[]) {
    this.category_id = category_id;
    this.category_name = category_name;
    this.subcategories = subcategories;
  }
}
