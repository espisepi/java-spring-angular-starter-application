import { Category } from '../models/category';
import { CategoryDto } from '../models/category-dto';

export class CategoryMapper {
  static toDto(category: Category): CategoryDto {
    return { name: category.name };
  }

  static toModel(category: Category): Category {
    return category;
  }
}
