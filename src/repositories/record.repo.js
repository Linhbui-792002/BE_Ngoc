import createHttpError from 'http-errors';
import Record from '../models/Record.js';
import SoilLayer from "../models/SoilLayer.js";


const getAllRecord = async () => {
    try {
        const records = await Record.find().sort({ createdAt: -1 })
        return records;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const getOneRecord = async ({ id }) => {
    try {
        const records = await Record.findOne({ _id: id }).exec()
        return records;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const createRecord = async ({ name }) => {
    try {
        const records = await Record.create({ name })
        return records._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
};



const editRecord = async ({ _id, name, li }) => {
    try {

        const updateRecord = await Record.findOneAndUpdate(
            { _id: _id },
            { name, li },
            { new: true }
        );
        if (!updateRecord) {
            throw createHttpError.NotFound(`Record ${_id} not existing.`)
        }
        return updateRecord._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
};


const deleteRecord = async ({ id }) => {
    try {

        const record = await Record.findOneAndDelete(
            { _id: id },
        );

        if (!record) {
            throw createHttpError.NotFound(`Record ${id} not existing.`)
        }
        const soilLayer = await SoilLayer.deleteMany({ record: id })

        return record._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
};


export default {
    getAllRecord,
    getOneRecord,
    createRecord,
    editRecord,
    deleteRecord
};
