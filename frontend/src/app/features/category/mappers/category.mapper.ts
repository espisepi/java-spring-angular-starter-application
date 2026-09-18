import { Category, CategoryRequest } from '../models/category';

export class CategoryMapper {
    static toRequest(category: Category): CategoryRequest {
        return { name: category.name };
    }

    static toModel(category: Category): Category {
        return category;
    }
}
