import createHttpError from "http-errors";
import { RecordRepo } from "../repositories/index.js";

const getRecords = async (req, res, next) => {
    try {
        const result = await RecordRepo.getAllRecord();
        res.status(200).json({
            statusCode: 200,
            message: 'get all record success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

const getOneRecordById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await RecordRepo.getOneRecord({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'get one record success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

const createOneRecord = async (req, res, next) => {
    try {
        const { name } = req.body

        const result = await RecordRepo.createRecord({ name });
        res.status(201).json({
            statusCode: 201,
            message: 'create record success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
};

const updateRecord = async (req, res, next) => {
    try {
        const { _id, name, li } = req.body

        const result = await RecordRepo.editRecord({ _id, name, li });
        res.status(200).json({
            statusCode: 200,
            message: 'update record success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
};

const deleteOneRecord = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await RecordRepo.deleteRecord({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'delete record success',
            data: result,
        });
    } catch (error) {
        next(error)
    }
};

export default {
    createOneRecord,
    getOneRecordById,
    getRecords,
    updateRecord,
    deleteOneRecord
}