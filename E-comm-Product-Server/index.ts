import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connDB } from './config/connDB';
import cors from 'cors';
import productRoutes from './routes/productsRouter';


const app: Express = express();
app.use(express.json());
app.use(cors());
connDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}...........`);
});

app.use('/api/products', productRoutes);



