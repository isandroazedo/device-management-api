import express from 'express';
import cors from 'cors';

const router = express.Router();

router.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));


router.get('/', (req: any, res: any) => res.send('Ok.'));

export default router;