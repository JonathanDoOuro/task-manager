import { DataSource } from "typeorm"

import dotenv from 'dotenv';
dotenv.config();

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: 'postgres',
    password: 'password',
    database: "postgres",
    entities: ["src/model/*.ts"],
    logging: true,
    synchronize: true,
})