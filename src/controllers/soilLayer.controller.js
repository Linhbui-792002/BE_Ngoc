import createHttpError from "http-errors";
import { SoilLayerRepo } from "../repositories/index.js";

const getSoilLayerByRecord = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await SoilLayerRepo.getSoilLayerByRecordId({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'get soil layer by record success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

const getSoilLayer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await SoilLayerRepo.getSoilLayer({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'get soil layer success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
}


const createOneSoilLayer = async (req, res, next) => {
    try {
        const { L, gama, phi, Qc, N, Eo, B, C, soilType, soilName, soilStatus, record } = req.body

        const result = await SoilLayerRepo.createSoilLayer({ L, gama, phi, Qc, N, Eo, B, C, soilType, soilName, soilStatus, record });
        res.status(201).json({
            statusCode: 201,
            message: 'create soil layer success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
};

const updateSoilLayer = async (req, res, next) => {
    try {
        const { _id, L, gama, phi, Qc, N, Eo, B, C, soilType, soilName, soilStatus } = req.body

        const result = await SoilLayerRepo.editSoilLayer({ _id, L, gama, phi, Qc, N, Eo, B, C, soilType, soilName, soilStatus });
        res.status(200).json({
            statusCode: 200,
            message: 'update soil layer success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
};

const deleteOneSoilLayer = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await SoilLayerRepo.deleteSoilLayer({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'delete soil layer success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
};

export default {
    getSoilLayerByRecord,
    getSoilLayer,
    createOneSoilLayer,
    updateSoilLayer,
    deleteOneSoilLayer
}