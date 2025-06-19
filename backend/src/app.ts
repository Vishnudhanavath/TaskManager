// src/app.ts
import express from "express"
import cors from "cors"
import taskRoutes from "./routes/taskRoutes"
import { errorHandler } from "./middleware/errorHandler";


const app = express()

app.use(errorHandler);
app.use(cors())
app.use(express.json())
app.use("/api", taskRoutes)

export default app
