import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import productRoutes from './routes/productsRouter';
import {connectRabbitMQ} from './config/rabbitmq';




export const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Product-Server is running on port ${process.env.PORT}...........`);
    // connectRabbitMQ();
});







