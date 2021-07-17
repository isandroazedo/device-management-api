import express from 'express';
import router from './routes';
import managementRouter from './routes/management/routes';

const app = express();
const PORT = 8000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', router);
app.use('/management', managementRouter);

const server = app.listen(PORT, () => console.log('Server is running.'));

export default server;