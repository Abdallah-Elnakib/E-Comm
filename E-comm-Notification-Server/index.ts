import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import {connectRabbitMQ} from './config/ConnRabbitmq';

export const app: Express = express();

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT || 3001, async () => {
    console.log(`🚀 Notification-Server is running on port ${process.env.PORT}...........`);
    await connectRabbitMQ();
});