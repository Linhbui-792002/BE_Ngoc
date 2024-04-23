import express from 'express';
import { RecordController } from '../controllers/index.js';

const recordRouter = express.Router();

recordRouter.get('/', RecordController.getRecords);
recordRouter.get('/:id', RecordController.getOneRecordById);
recordRouter.post('/', RecordController.createOneRecord);
recordRouter.patch('/', RecordController.updateRecord);
recordRouter.delete('/:id', RecordController.deleteOneRecord);


export default recordRouter;
