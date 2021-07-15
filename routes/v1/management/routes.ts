import express from 'express';

const managementRouter = express.Router();

managementRouter.get('/categories', async (req: any, res: any) => {
    return res.json({'message': 'get'});
});

export default managementRouter;