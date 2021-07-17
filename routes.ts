import express from 'express';
import cors from 'cors';

const router = express.Router();

router.use(cors({
    origin: [
        'http://dm:4200', 
        'http://dm:8080', 
        'http://dm'
    ],
    optionsSuccessStatus: 200
}));


router.get('/', (req: any, res: any) => res.send('Ok.'));

export default router;