import { Category, CategoryModel } from '../models/category'

export class CategoryService {
    list(): Promise<Array<CategoryModel>> {
        return Category.findAll();
    }
}