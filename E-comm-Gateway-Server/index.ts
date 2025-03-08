import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import auth from './routes/authRoutes';


const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Gateway-Server started at http://localhost:${process.env.PORT}............`);
    }
);