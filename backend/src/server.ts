import express from 'express';
import 'dotenv/config'
import userRouter from "./routers/UserRouter";
import ResourceRouter from "./routers/ResourceRouter";

const app = express();

app.use(express.json());
app.use('/', userRouter, ResourceRouter);


export default app;