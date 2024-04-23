import express from 'express';
import { PileController } from '../controllers/index.js';

const pileRouter = express.Router();

pileRouter.get('/:id', PileController.getPileByRecordId);
pileRouter.post('/', PileController.createOrUpdatePile);


export default pileRouter;
