import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"160000kb"
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.get('/test', (req, res) => {
    res.json({ message: "Test route works" });
  });

// import routes
import userRouter from './routes/user.routes.js'


//route declaration
app.use("/api/v1/users", userRouter)



export {app}
