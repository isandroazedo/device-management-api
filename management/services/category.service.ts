import { Category, CategoryModel } from '../models/category'

export class CategoryService {
    async create(entity: CategoryModel) {
        return  Category.create(entity);
    }
    async get(id: number): Promise<CategoryModel> {
        return Category.findOne(id);
    }
    async delete(id: number) {
        return Category.destroy({
            where: {
                "id": id
             }
        });
    }
    async list(): Promise<Array<CategoryModel>> {
        return Category.findAll();
    }
}