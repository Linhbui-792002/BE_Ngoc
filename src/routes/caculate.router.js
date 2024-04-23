import express from 'express';
import { CaculateController } from '../controllers/index.js';

const caculateRouter = express.Router();

caculateRouter.get('/pptk/:id', CaculateController.categoryByPptk);
caculateRouter.get('/cpt/:id', CaculateController.categoryByCPT);
caculateRouter.get('/spt/:id', CaculateController.categoryBySPT);


export default caculateRouter;
