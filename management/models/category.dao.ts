import { Category, CategoryAddModel, CategoryViewModel } from "./category";
import { GenericDAO } from "./generic.dao";

export class CategoryDAO extends GenericDAO<CategoryAddModel, CategoryViewModel> {
    constructor(){
        super(Category);
    }
}