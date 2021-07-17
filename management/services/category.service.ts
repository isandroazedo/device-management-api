import { CategoryAddModel, CategoryViewModel } from '../models/category';
import { CategoryDAO } from '../models/category.dao';
import { BaseService } from './base.service';

export class CategoryService extends BaseService<CategoryAddModel, CategoryViewModel, CategoryDAO> {
    constructor() {
        super(new CategoryDAO());
    }
}