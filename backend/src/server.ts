import "reflect-metadata"
import { AppDataSource } from "./data-source"
import app from "./app"

const PORT = process.env.PORT

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
