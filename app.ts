import express, { Request, Response , Express} from 'express';
require('dotenv').config();
const app : Express = express();



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000...........');
});