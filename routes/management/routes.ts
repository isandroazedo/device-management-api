import express from 'express';
import { CategoryService } from '../../management/services/category.service';

const managementRouter = express.Router();
const categoryService = new CategoryService();

managementRouter.get('/categories', async (req: any, res: any) => {
    const categories = categoryService.list();
    return categories.then((u) => res.json(u));
});

managementRouter.delete('/categories/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        categoryService.delete(id)
            .then((count: number) => {
                if (count > 0){
                    res.json(count);
                } else {
                    res.status(404).send('Not found');
                }                
            });
    } catch (error) {
        res.send(error.message);
    }
    
});

export default managementRouter;