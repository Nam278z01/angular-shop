import { SubCategory } from './sub-category';

export class Category {
  public category_id: number;
  public category_name: string;
  public subcategories: SubCategory[];
}
