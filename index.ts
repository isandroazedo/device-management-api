import express from 'express';
import router from './routes';
import managementRouter from './routes/v1/management/routes';

const app = express();
const PORT = 8000;

app.use('/', router);
app.use('/management', managementRouter);
const server = app.listen(PORT, () => console.log('Server is running.'));

export default server;