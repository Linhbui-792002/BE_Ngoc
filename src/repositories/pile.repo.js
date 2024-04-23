import Pile from "../models/Pile.js";
import mongoose from "mongoose";

const createOrUpdatePile = async ({ _id, pileData }) => {
    try {
        const pile = _id
            ? await Pile.findByIdAndUpdate(_id, pileData, { new: true, upsert: false })
            : await new Pile({ _id: new mongoose.Types.ObjectId(), ...pileData }).save();
        return pile;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const getPileByRecordId = async ({ id }) => {
    try {
        const pile = await Pile.findOne({ record: id });
        return pile;
    } catch (error) {
        throw new Error(error.toString());
    }
};

export default {
    createOrUpdatePile,
    getPileByRecordId
}