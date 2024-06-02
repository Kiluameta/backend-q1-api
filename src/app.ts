import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import itemRoutes from './routes/item.routes';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

export default app;