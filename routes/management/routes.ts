import express from 'express';
import { CategoryService } from '../../management/services/category.service';

const managementRouter = express.Router();
const categoryService = new CategoryService();
const messages: any = {
    'ER_DUP_ENTRY': 'There is already a category with the same name',
    'ER_BAD_NULL_ERROR': 'Category name is required'
};

managementRouter.get('/category', async (req: any, res: any) => {
    const categories = categoryService.list();
    return categories.then((u) => res.json(u));
});

managementRouter.delete('/category/:id', async (req: any, res: any) => {
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

managementRouter.post('/category', async (req: any, res: any) => {
    categoryService.create(req.body)
    .then((result: any) => {
        console.log('then', result);
        res.status(201).json(result);
    })
    .catch((error: any) => {
        const code: string = error.parent.code;
        if (messages.hasOwnProperty(code)) {
            res.status(400).send(messages[code]);
            return;
        }
        res.status(500).send('Error executing request. ' + error.message);
    });
});

export default managementRouter;