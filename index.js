import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL)
.then(
    app.listen(process.env.PORT, () => {
        console.log("working.")
    })
).catch((error) => {
    console.log("MongoDB ERROR: ", error)
})

// the outer routes, inner routes are in the routes folder.
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);