import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {
    errorHandlerMiddleware,
    notFoundHandler,
} from './src/middlewares/errorHandlers.js';

dotenv.config();
import connect from './database.js';
import { caculateRouter, pileRouter, recordRouter, soilLayerRouter } from './src/routes/index.js';
import { DATA_RA } from './src/common/constan/api-nen-mong.js';

const app = express();

//Init Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(
    express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://tinh-toan-suc-chiu-tai-coc.vercel.app'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
    })
);

//Init Routers
app.use('/record', recordRouter);
app.use('/soilLayer', soilLayerRouter);
app.use('/pile', pileRouter);
app.use('/caculate', caculateRouter)


const port = process.env.PORT;

//Handling Error
app.use(notFoundHandler);
app.use(errorHandlerMiddleware);

app.listen(port, async () => {
    await connect();
    console.log(`server is runing on : http://localhost:${port}`);
});
