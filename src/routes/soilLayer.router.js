import express from 'express';
import { SoilLayerController } from '../controllers/index.js';

const soilLayerRouter = express.Router();

soilLayerRouter.get('/soilLayerRecord/:id', SoilLayerController.getSoilLayerByRecord);
soilLayerRouter.get('/:id', SoilLayerController.getSoilLayer);
soilLayerRouter.post('/', SoilLayerController.createOneSoilLayer);
soilLayerRouter.patch('/', SoilLayerController.updateSoilLayer);
soilLayerRouter.delete('/:id', SoilLayerController.deleteOneSoilLayer);


export default soilLayerRouter;
