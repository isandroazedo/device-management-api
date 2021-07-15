import express from 'express';
import { CategoryService } from '../../management/services/category.service';

const managementRouter = express.Router();
const categoryService = new CategoryService();

managementRouter.get('/categories', async (req: any, res: any) => {
    const categories = categoryService.list();
    return categories.then((u) => res.json(u));
});

export default managementRouter;