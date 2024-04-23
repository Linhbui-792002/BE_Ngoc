import createHttpError from "http-errors";
import { PileRepo } from "../repositories/index.js";

const createOrUpdatePile = async (req, res, next) => {
    try {
        const { _id, a, hm, B, CB, n, r, cdc, cdtt, Pvl, record } = req.body;
        const pileData = { a, hm, B, CB, n, r, cdc, cdtt, Pvl, record }
        const pile = await PileRepo.createOrUpdatePile({ _id, pileData });
        res.status(200).json({
            statusCode: 200,
            message: _id ? 'update pile success' : 'create pile success',
            data: pile,
        });

    } catch (error) {
        next(error);
    }
};

const getPileByRecordId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pile = await PileRepo.getPileByRecordId({ id });
        res.status(200).json({
            statusCode: 200,
            message: 'get pile by record id success',
            data: pile,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createOrUpdatePile,
    getPileByRecordId
};