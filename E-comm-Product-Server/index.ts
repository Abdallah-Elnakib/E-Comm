import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import productRoutes from './routes/productsRouter';
import reviewRoutes from './routes/reviewsRouter';
import {connectRabbitMQ} from './config/rabbitmq';
import {connRedis} from './config/connRedisServer';



const app: Express = express();


app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(process.env.PORT || 5000, async () => {
    console.log(`🚀 Product-Server is running on port ${process.env.PORT}...........`);
    await connRedis();
    // connectRabbitMQ();
});







