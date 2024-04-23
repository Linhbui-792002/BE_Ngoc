import mongoose, { Schema, ObjectId } from 'mongoose';

const soilLayerSchema = new Schema(
    {
        L: {
            type: Number,
            required: true,
        },
        gama: {
            type: Number,
            required: true,
        },
        phi: {
            type: Number,
            required: true,
        },
        Qc: {
            type: Number,
            required: true,
        },
        N: {
            type: Number,
            required: true,
        },
        Eo: {
            type: Number,
            required: true,
        },
        B: {
            type: Number,
            required: true,
        },
        C: {
            type: Number,
            required: true,
        },
        soilType: {
            type: String,
            required: true,
        },
        soilName: {
            type: String,
            required: true,
        },
        soilStatus: {
            type: String,
            required: true,
        },
        record: {
            type: ObjectId,
            ref: 'records'
        }
    },
    {
        timestamps: true,
    }
);

const SoilLayer = mongoose.model('soilLayers', soilLayerSchema);
export default SoilLayer;
