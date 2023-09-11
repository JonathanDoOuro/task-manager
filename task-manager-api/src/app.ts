import express from 'express';
import { router } from './router';
import dotenv from 'dotenv';
import { myDataSource } from './db/app-data-source';
import cors from 'cors';
dotenv.config();

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado")
    })
    .catch((err: any) => {
        console.error("Erro durante inicialização:", err)
    })

const app = express();

app.use(cors())
app.use(express.json());
app.use(router);

export { app };