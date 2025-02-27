import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { connDB } from './config/connDB';

const app: Express = express();

connDB();

mongoose.connection.once('open', () => {
    console.log('Database connected successfully...................');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}...........`);
    });
});

mongoose.connection.on('error', (error) => {
    console.error('Database connection failed:', error);
});