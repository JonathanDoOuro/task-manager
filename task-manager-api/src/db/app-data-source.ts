import { DataSource } from "typeorm"
import { Task } from "../models/task";

import dotenv from 'dotenv';
dotenv.config();

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: 'postgres',
    password: 'password',
    database: "postgres",
    entities: [Task],
    logging: true,
    synchronize: true,
})