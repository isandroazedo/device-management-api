import { Category, CategoryModel } from '../models/category'

export class CategoryService {
    exists(id: number): Promise<CategoryModel> {
        return Category.findById(id);
    }
    delete(id: number) {
        return Category.destroy({
            where: {
                "id": id
             }
        });
    }
    list(): Promise<Array<CategoryModel>> {
        return Category.findAll();
    }
}