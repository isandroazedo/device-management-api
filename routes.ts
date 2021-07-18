import express from 'express';
import cors from 'cors';

const router = express.Router();

router.use(cors({
    origin: [
        'http://dm:4200', 
        'http://dm:8080', 
        'http://dm',
        'http://localhost:4200', 
        'http://localhost:8080', 
        'http://localhost',
        'http://3.135.247.241'
    ],
    optionsSuccessStatus: 200
}));


router.get('/', (req: any, res: any) => res.send('Ok'));

export default router;