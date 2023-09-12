import { DataSource } from "typeorm"
import { Task } from "../../models/task";

import dotenv from 'dotenv';
dotenv.config();

export const myTestDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "password",
    database: "db_test",
    entities: [Task],
    logging: true,
    synchronize: true,
})