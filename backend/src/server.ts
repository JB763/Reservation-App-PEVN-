import express from 'express';
import 'dotenv/config'
import userRouter from "./routers/UserRouter";

const app = express();

app.use(express.json());
app.use('/', userRouter);


export default app;