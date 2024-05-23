import * as dotenv from 'dotenv';
dotenv.config();
require('express-async-errors');

import express from "express"
import cookieParser from 'cookie-parser';
const app = express();

//connect to database
import { connectDB } from "./db/connect";

//routes
import authRouter from './routes/authRoutes'
import accountRouter from './routes/accountroutes'

//middlewares 
import errorHandlerMiddleWare from './middleware/error-handler'

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/accounts', accountRouter)

app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB("");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start()