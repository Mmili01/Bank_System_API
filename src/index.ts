import * as dotenv from 'dotenv';
dotenv.config();
require('express-async-errors');

import express from "express"
const app = express();

//connect to database
import { connectDB } from "./db/connect";

//routes
import authRouter from './routes/authRoutes'

app.use(express.json());
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB("mongodb+srv://ebubeabba:SjvJH7E5nGzhvy9o@firstcluster.qiz3znk.mongodb.net/Bank_System_API?retryWrites=true&w=majority");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start()