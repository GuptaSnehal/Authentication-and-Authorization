import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();
//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database connected'))
.catch((err)=>console.log('Database not connected', err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : false}))


app.use('/', authRoutes);
const port = 8000;
app.listen(port , ()=>console.log(`Server is running on port ${port}`));