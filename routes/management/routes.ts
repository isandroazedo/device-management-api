import express from 'express';
import { ValidationErrorItem } from 'sequelize/types';
import { DeviceViewModel } from '../../management/models/device';
import { CategoryService } from '../../management/services/category.service';
import { DeviceService } from '../../management/services/device.service';

const managementRouter = express.Router();
const categoryService = new CategoryService();
const deviceService = new DeviceService();

const messages: any = {
    'ER_DUP_ENTRY': 'There is already a category with the same name',
    'ER_BAD_NULL_ERROR': '{0} name is required'
};

const handleMessage = (error: any, name: string): string | null => {
    const code: string = error.parent.code;
    if (messages.hasOwnProperty(code)) {
        return messages[code].replace("{0}", name);
    }
    return null;
}

const handleError = (error: any, res: any, name: string) => {
    if (error.parent) {
        let msg = handleMessage(error, name);
        if (!msg) {
            msg = error.parent.message;
        }
        res.status(400).send(msg);
        return;
    } else if (error.errors && error.errors.length > 0) {
        let message = 'The following fields cannot be null: ';
        let errors: ValidationErrorItem[] = error.errors;
        message += errors.map(u => u.path).join();
        res.status(400).send(message);
        return;
    }
    res.status(500).send('Error executing request. ' + error.message);
}

managementRouter.get('/category', async (req: any, res: any) => {
    const categories = categoryService.list();
    return categories.then((u) => res.json(u));
});

managementRouter.delete('/category/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        categoryService.delete(id)
            .then((count: number) => {
                if (count > 0) {
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
            res.status(201).json(result);
        })
        .catch((error: any) => handleError(error, res, 'Category'));
});

managementRouter.get('/device', async (req: any, res: any) => {
    const devices = deviceService.list();
    return devices.then((u) => res.json(u));
});

managementRouter.delete('/device/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        deviceService.delete(id)
            .then((count: number) => {
                if (count > 0) {
                    res.json(count);
                } else {
                    res.status(404).send('Not found');
                }
            });
    } catch (error) {
        res.send(error.message);
    }

});

managementRouter.post('/device', async (req: any, res: any) => {
    deviceService.create(req.body)
        .then((result: DeviceViewModel) => res.status(201).json(result))
        .catch((error: any) => handleError(error, res, 'Device'));
});

export default managementRouter;