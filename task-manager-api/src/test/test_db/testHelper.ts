import { DataSource } from "typeorm"
import { Task } from "../../models/task";

import dotenv from 'dotenv';
dotenv.config();

export const myTestDataSource = new DataSource({
    port: 5000,
    type: "postgres",
    host: "postgresTest",
    username: "postgres",
    password: "password",
    database: "postgres",
    entities: [Task],
    logging: true,
    synchronize: true,
})