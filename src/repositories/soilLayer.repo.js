import SoilLayer from "../models/SoilLayer.js";
import createHttpError from 'http-errors';

const getSoilLayerByRecordId = async ({ id }) => {
    try {
        const soilLayer = await SoilLayer.find({ record: id })
            .sort({ createdAt: 1 })
        return soilLayer;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const getSoilLayer = async ({ id }) => {
    try {
        const soilLayer = await SoilLayer.findOne({ _id: id }).exec()
        return soilLayer;
    } catch (error) {
        throw new Error(error.toString());
    }
};


const createSoilLayer = async ({ L, gama, phi, Qc, N, Eo, B, C, soilType, soilName, soilStatus, record }) => {
    try {
        const soilLayer = await SoilLayer.create({ L, gama, phi, Qc, N, Eo, B, C, soilType, soilName, soilStatus, record })
        return soilLayer._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
};



const editSoilLayer = async ({ _id, L, gama, phi, Qc, N, Eo, B, C, soilType, soilName, soilStatus }) => {
    try {

        const updateSoilLayer = await SoilLayer.findOneAndUpdate(
            { _id: _id },
            { L, gama, phi, Qc, N, Eo, B, C, soilType, soilName, soilStatus },
            { new: true }
        );
        if (!updateSoilLayer) {
            throw createHttpError.NotFound(`Soil layer ${_id} not existing.`)
        }
        return updateSoilLayer._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
};


const deleteSoilLayer = async ({ id }) => {
    try {

        const soilLayer = await SoilLayer.findOneAndDelete(
            { _id: id },
        );
        if (!soilLayer) {
            throw createHttpError.NotFound(`Soil layer ${id} not existing.`)
        }
        return soilLayer._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
};


export default {
    getSoilLayerByRecordId,
    getSoilLayer,
    createSoilLayer,
    editSoilLayer,
    deleteSoilLayer
}