import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';




const app: Express = express();


app.use(express.json());
app.use(cors());



app.listen(process.env.PORT || 8080, async () => {
    console.log(`🚀 Order-Server is running on port ${process.env.PORT}...........`);
});
