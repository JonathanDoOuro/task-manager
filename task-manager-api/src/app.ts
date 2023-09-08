import express from 'express';
import { router } from './router';
import dotenv from 'dotenv';
import { myDataSource } from './db/app-data-source';
dotenv.config();

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();

app.use(express.json());
app.use(router);

export { app };