import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import oreders from './routes/orderRoutes';
import {connectRabbitMQ} from './config/rabbitMQ';


const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/api/orders', oreders);

app.listen(process.env.PORT || 6000, async () => {
    console.log(`🚀 Order-Server is running on port ${process.env.PORT}...........`);
    await connectRabbitMQ();
});
