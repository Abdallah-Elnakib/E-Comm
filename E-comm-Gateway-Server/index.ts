import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import auth from './routes/authRoutes';
import product from './routes/productRoutes';
import session from 'express-session';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  }));

app.use('/api/auth', auth);
app.use('/api/product', product);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Gateway-Server started at http://localhost:${process.env.PORT}............`);
    }
);