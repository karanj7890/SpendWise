import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js'
import { connectDB } from './utils/db.js';
import dotenv from "dotenv";
import categoryRouter from './routes/categoryRouter.js';
import transactionRouter from './routes/transactionRouter.js';
import cors from "cors";

dotenv.config()

const app= express()

connectDB()



app.use(
  cors({
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"]
  })

);


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/auth",categoryRouter);
app.use("/api/auth",transactionRouter);



const PORT = process.env.PORT;
app.listen(PORT, () =>{
  console.log("Server is running on this port " + PORT);
});
