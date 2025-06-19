// src/data-source.ts
import { DataSource } from "typeorm"
import { Task } from "./entity/Task"
import * as dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH || "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Task],
})
